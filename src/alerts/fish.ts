import { $ } from "dom";
import { enqueueAlert } from "../queue";
import { sendFishToArena } from "./arena";

const fishImgUrl = (fish_id: number, fish: string) => {
  if (fish_id >= 5000) {
    // legacy fish
    console.log(`/fish/${encodeURIComponent(fish.toLowerCase())}.png`);
    return `/fish/${encodeURIComponent(fish.toLowerCase())}.png`;
  }
  return `/newfish/spr_fish_${fish_id}_x.png`;
};

export const fishImg = (fish_id: number, fish: string) =>
  $.wattr($.div, { class: "fishfighter" })(
    $.wattr($.img, {
      src: fishImgUrl(fish_id, fish),
      class: fish_id < 5000 ? "newfish" : undefined,
    })(),
  );

export const setupFishAlerts = () => {
  const plop = new Audio("/sounds/fish_plop.mp3");
  plop.volume = 0.2;

  const legendary = new Audio("/sounds/fish_legendary.mp3");
  legendary.volume = 0.3;

  const nullfish = new Audio("/sounds/fish_null.mp3");
  nullfish.volume = 0.3;

  $.listen("fish-catch", (e) => {
    const { event_data: data } = e.detail;
    const fish = data.fish.toLowerCase();
    const classification = data.classification.toLowerCase();
    const f = fishImg(data.id, fish);
    enqueueAlert("fish", {
      element: f,
      onShow: () =>
        setTimeout(
          () =>
            fish === "{null}fish"
              ? nullfish.play()
              : classification === "legendary"
                ? legendary.play()
                : plop.play(),
          100,
        ),
      destination: "#pond",
      durationMs: 3000,
    });
  });
};
