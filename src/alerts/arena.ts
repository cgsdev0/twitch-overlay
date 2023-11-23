import { $, Classification } from "dom";
import { arenaConfetti } from "./confetti";
import { fishImg } from "./fish";

const fighter = $.className($.div, "fighter");
const card = $.className($.div, "card");
const name = $.className($.div, "name");
const healthInner = $.className($.div, "healthInner");
const healthOuter = $.className($.div, "healthOuter");
const fishBowl = $.className($.div, "fishBowl");
const winStreak = $.className($.div, "winStreak");
const hitMarker = $.className($.div, "hitMarker");

const healthbar = () => healthOuter(healthInner());

type StatsGenerator = () => Omit<Stats, "maxHp" | "wins" | "originalHp">;
type LootTable = { [K in Classification]: StatsGenerator };

let fatality: HTMLAudioElement | undefined;

export const setupArena = () => {
  fatality = new Audio("/sounds/fatality.mp3");
  fatality.volume = 0.2;
  const loaded = localStorage.getItem("battleQueue");
  if (loaded) {
    const oldQueue = JSON.parse(loaded) as ReturnType<typeof serializableQueue>;
    oldQueue.forEach((e) => {
      const { fishType, stats, caughtBy } = e;
      sendFighterToArena(fishImg(fishType), fishType, stats, caughtBy);
    });
  }
};
const commons: StatsGenerator = () => ({
  speed: d(20),
  hp: 10 + 2 * d(8),
  baseDmg: d(6),
  varDmg: d(4),
});

const rares: StatsGenerator = () => ({
  speed: d(20) + 1,
  hp: 10 + 2 * d(10) + d(6),
  baseDmg: d(6) + 1,
  varDmg: d(4),
});

const classModifiers: LootTable = {
  common: commons,
  fairly_common: commons,
  uncommon: commons,
  scarce: rares,
  rare: rares,
  epic: () => ({
    speed: d(20) + 2,
    hp: 10 + 2 * d(10) + d(6),
    baseDmg: d(8) + 2,
    varDmg: d(6),
  }),
  legendary: () => ({
    speed: d(20) + 3,
    hp: 15 + 3 * d(10),
    baseDmg: d(8) + 3,
    varDmg: 6,
  }),
  null: () => ({
    speed: 0,
    hp: d(100),
    baseDmg: 0,
    varDmg: 0,
  }),
};

interface Stats {
  speed: number;
  hp: number;
  wins: number;
  maxHp: number;
  originalHp: number;
  baseDmg: number;
  varDmg: number;
}

interface Fighter {
  fish: Element;
  attack(who: Fighter): void;
  dealDmg(n: number, who?: Fighter): void;
  heal(): void;
  stats: Stats;
  caughtBy: string;
  fishType: string;
}
const battleQueue: Fighter[] = [];

const serializableQueue = () =>
  battleQueue.map(({ stats, fishType, caughtBy }) => ({
    stats,
    fishType,
    caughtBy,
  }));

const save = () => {
  localStorage.setItem("battleQueue", JSON.stringify(serializableQueue()));
};

let starting = false;
const startCombat = () => {
  if (battleQueue.length < 2) return;
  if (starting) return;
  starting = true;
  setTimeout(() => {
    const champion = battleQueue[0];
    const challenger = battleQueue[1];
    if (champion.stats.speed >= challenger.stats.speed) {
      champion.attack(challenger);
    } else {
      challenger.attack(champion);
    }
    starting = false;
  }, 2000);
};
const d = (n: number) => Math.floor(Math.random() * n) + 1;
const rollStats = (classification: Classification): Stats => {
  const mods = classModifiers[classification]();
  return { ...mods, wins: 0, maxHp: mods.hp, originalHp: mods.hp };
};

const rollDmg = (stats: Stats) =>
  (stats.wins === 0 && d(100) === 100 ? 5 : 1) *
  Math.max(1, stats.baseDmg + d(stats.varDmg));

export const sendFishToArena = (
  fish: Element,
  fishType: string,
  classification: Classification,
  caughtBy: string
) => {
  const stats = rollStats(classification);
  sendFighterToArena(fish, fishType, stats, caughtBy);
};

export const sendFighterToArena = (
  fish: Element,
  fishType: string,
  stats: Stats,
  caughtBy: string
) => {
  const f = fighter(
    fishBowl(winStreak(), fish),
    card(name(caughtBy), healthbar())
  );
  $("#arena")!.append(f);

  const attack = (who: Fighter) => {
    f.classList.remove("damage");
    setTimeout(() => {
      const rolled = rollDmg(stats);
      if (rolled >= stats.baseDmg + stats.varDmg) {
        // crit
        f.classList.add("critical");
      } else {
        f.classList.add("attacking");
      }
      setTimeout(() => {
        who.dealDmg(rolled, challenger);
      }, 400);
      setTimeout(() => {
        f.classList.remove("attacking");
        f.classList.remove("critical");
      }, 1000);
    }, 1);
  };

  // be advised: healing is just negative damage lol
  const dealDmg = (dmg: number, who?: Fighter) => {
    const isFatality = stats.hp === stats.maxHp && dmg >= stats.hp;
    stats.hp -= dmg;
    save();
    (f.querySelector(".healthInner")! as HTMLElement).style.width = `${
      Math.max(0.0, stats.hp / stats.maxHp) * 100
    }%`;
    if (dmg <= 0.0 || !who) {
      return;
    }
    f.querySelector(".fishBowl")!.append(hitMarker(`-${dmg}`));
    f.classList.remove("damage");
    f.classList.add("damage");
    if (stats.hp >= 0) {
      setTimeout(() => {
        f.classList.remove("damage");
        attack(who);
      }, 1000);
    } else {
      // Oh no! this fish has fainted!
      setTimeout(() => {
        if (stats.wins >= 10) {
          arenaConfetti();
          const event = new CustomEvent("fish-champion", {
            detail: { stats, caughtBy, fishType },
          });
          document.dispatchEvent(event);
        }
        f.classList.remove("damage");
        f.classList.add("fainting");
        setTimeout(() => {
          if (isFatality) fatality?.play();
          const idx = battleQueue.findIndex((e) => e.fish === f);
          battleQueue.splice(idx, 1);
          f.remove();
          who.stats.wins += 1;
          who.heal();
          who.fish.querySelector(
            ".winStreak"
          )!.innerHTML = `${who.stats.wins}x wins`;
          startCombat();
        }, 1000);
      }, 500);
    }
  };

  const heal = () => {
    // lol
    dealDmg(stats.hp - stats.maxHp, undefined);
    // being a fighter is a hard life, it takes a toll on you
    const deathsave = d(20);
    if (stats.wins > 1 && stats.maxHp > 1 && deathsave <= 10) {
      f.classList.add("damage");
      if (deathsave === 1) {
        stats.maxHp -= 10;
      } else {
        stats.maxHp -= 1;
      }
      if (stats.maxHp < 1) stats.maxHp = 1;
      // f.querySelector(".fishBowl")!.append(hitMarker(`decay`));
      if (stats.hp > stats.maxHp) stats.hp = stats.maxHp;
    }
    // f.querySelector(".fishBowl")!.append(hitMarker(`${stats.hp}`));
    save();
  };

  const challenger = {
    fish: f,
    attack,
    caughtBy,
    stats,
    dealDmg,
    heal,
    fishType,
  };
  if (stats.wins) {
    f.querySelector(".winStreak")!.innerHTML = `${stats.wins}x wins`;
  }
  (f.querySelector(".healthInner")! as HTMLElement).style.width = `${
    Math.max(0.0, stats.hp / stats.maxHp) * 100
  }%`;
  battleQueue.push(challenger);
  save();
  if (battleQueue.length === 2) {
    startCombat();
  }
};
