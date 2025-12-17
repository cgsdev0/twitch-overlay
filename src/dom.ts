import { EventTypeMap } from "tau-types";
import type * as CSS from "csstype";

type NodeArray = Parameters<ParentNode["append"]>;
const builder =
  <T extends keyof HTMLElementTagNameMap>(type: T) =>
  (...that: NodeArray) => {
    const newEl = document.createElement(type);
    newEl.append(...that);
    return newEl;
  };

const builderNames = [
  "header",
  "section",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "iframe",
  "img",
  "div",
  "p",
  "span",
  "strong",
  "em",
] as const;
export type Builders = {
  [K in (typeof builderNames)[number]]: ReturnType<typeof builder<K>>;
};
const builders: Builders = {} as Builders;
builderNames.forEach((name) => ((builders as any)[name] = builder(name)));

type Attributes = Record<string, string | number | undefined>;
type Constraint = ReturnType<typeof builder>;
export const attr =
  <T extends Constraint>(base: T) =>
  (attributes: Attributes, ...that: NodeArray) => {
    const el = base(...that);
    Object.entries(attributes).forEach(([attr, val]) => {
      if (typeof val === "undefined") return;
      if (typeof val === "number") {
        el.setAttribute(attr, val.toString());
      } else {
        el.setAttribute(attr, val);
      }
    });
    return el as ReturnType<T>;
  };
export const wattr =
  <T extends Constraint>(base: T, attributes: Attributes) =>
  (...that: NodeArray) => {
    const el = base(...that);
    Object.entries(attributes).forEach(([attr, val]) => {
      if (typeof val === "undefined") return;
      if (typeof val === "number") {
        el.setAttribute(attr, val.toString());
      } else {
        el.setAttribute(attr, val);
      }
    });
    return el as ReturnType<T>;
  };
export const className =
  <T extends Constraint>(base: T, className: string) =>
  (...that: NodeArray) => {
    const el = base(...that);
    el.className = className;
    return el as ReturnType<T>;
  };

export const slideUp =
  <T extends Constraint>(base: T) =>
  (...that: NodeArray) => {
    const el = base(...that);
    el.classList.add("slide-up-trigger");
    el.classList.add("slide-up");
    setTimeout(() => el.classList.remove("slide-up-trigger"), 1);
    return el as ReturnType<T>;
  };

export const expire = <T extends ReturnType<Constraint>>(
  after: number,
  el: T,
  transitionOut?: string,
) => {
  if (transitionOut) {
    setTimeout(() => {
      el.classList.add(transitionOut);
    }, after);
    after += 4000;
  }
  setTimeout(() => {
    el.remove();
  }, after);
  return el;
};

type CrappyBoolean = "0" | "1";
type IRCMessageKey = "irc-message";
interface Emote {
  id: string;
  positions: Array<[number, number]>;
}
interface IRCMessage {
  command: string;
  prefix: string;
  sections: string[];
  tags?: {
    "badge-info": string;
    bits?: string;
    badges: string;
    "client-nonce": string;
    color: string;
    "display-name": string;
    "emote-only"?: CrappyBoolean;
    emotes: Emote[];
    "first-msg"?: CrappyBoolean;
    flags: string;
    id: string;
    mod?: CrappyBoolean;
    "msg-id"?: "highlighted-message";
    "returning-chatter"?: CrappyBoolean;
    "room-id": string;
    subscriber?: CrappyBoolean;
    "tmi-sent-ts": string;
    turbo?: CrappyBoolean;
    "user-id": string;
    "user-type": string;
  };
}

export interface TauMessage<T, K> {
  id: string;
  event_id: string;
  event_type: K;
  event_data: T;
  event_source: string;
  created: string;
  origin: "twitch" | "replay";
}

type RemoveIndex<T> = {
  [K in keyof T]: string;
};
type CSSType = Partial<RemoveIndex<CSS.PropertiesHyphen>>;
const styles = (...styleObjects: CSSType[]): string => {
  let result: CSSType = {};
  styleObjects.forEach((s) => {
    Object.assign(result, s);
  });
  const r = Object.entries(result)
    .map(([key, val]) => `${key}: ${val};`)
    .join(" ");
  return r;
};

export interface FishStats {
  speed: number;
  hp: number;
  baseDmg: number;
  varDmg: number;
}

export type Classification =
  | "common"
  | "fairly_common"
  | "uncommon"
  | "scarce"
  | "rare"
  | "epic"
  | "legendary"
  | "null";
type MessageBusEventType = {
  "wheel-add-user": {
    name: string;
    weight: number;
  };
  "wheel-spin": {};
  "wheel-show": {};
  "new-license": { license: string };
  "fish-catch": {
    fish: string;
    id: number;
    float: string;
    stats: FishStats;
    classification: Classification;
    caught_by: string;
    twitch_id: number;
  };
};
type StreamOnlineType = {
  "stream-online": {
    id: string;
    broadcaster_user_id: string;
    boradcaster_user_login: string;
    broadcaster_user_name: string;
    type: string;
    started_at: string;
  };
  "stream-offline": {
    /* TODO: fact check this */
    id: string;
    broadcaster_user_id: string;
    boradcaster_user_login: string;
    broadcaster_user_name: string;
    type: string;
    started_at: string;
  };
};
type MessageBusKey = keyof MessageBusEventType;
type OnlineKey = keyof StreamOnlineType;
type EventKey = keyof EventTypeMap | IRCMessageKey | MessageBusKey | OnlineKey;
type TypeFromKey<Key extends EventKey> = Key extends keyof EventTypeMap
  ? TauMessage<EventTypeMap[Key], Key>
  : Key extends IRCMessageKey
    ? IRCMessage
    : Key extends MessageBusKey
      ? TauMessage<MessageBusEventType[Key], Key>
      : Key extends OnlineKey
        ? TauMessage<StreamOnlineType[Key], Key>
        : never;

// REGISTER ERROR OVERLAY
const showErrorOverlay = (err: any) => {
  // must be within function call because that's when the element is defined for sure.
  const ErrorOverlay = customElements.get("vite-error-overlay");
  // don't open outside vite environment
  if (!ErrorOverlay) {
    return;
  }
  console.log(err);
  const overlay = new ErrorOverlay(err);
  document.body.appendChild(overlay);
};

window.addEventListener("error", showErrorOverlay);
window.addEventListener("unhandledrejection", ({ reason }) =>
  showErrorOverlay(reason),
);
function listen<T extends EventKey>(
  key: T,
  cb: (e: CustomEvent<TypeFromKey<T>>) => void,
  node?: HTMLElement,
): () => void {
  const wrapped = (e: any) => {
    try {
      cb(e);
    } catch (e) {
      showErrorOverlay(e);
    }
  };
  const n = node || document;
  n.addEventListener(key, wrapped);
  return () => {
    n.removeEventListener(key, wrapped);
  };
}

export const $ = Object.assign(
  Object.assign(
    (...a: Parameters<(typeof document)["querySelector"]>) =>
      document.querySelector(...a),
    builders,
  ),
  { wattr, className, attr, expire, listen, styles, slideUp },
);

// const container = className(wattr(div, { this: "is a test" }), "container");
