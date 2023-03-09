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
  transitionOut?: string
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
type ChatMessageKey = "chat-message";
interface Emote {
  id: string;
  positions: Array<[number, number]>;
}
interface ChatMessage {
  irc_username: string;
  data: {
    command: string;
    "message-text": string;
    params: string[];
    prefix: string;
    raw: string;
    tags: {
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
  };
}

interface TauMessage<T, K> {
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

type EventKey = keyof EventTypeMap | ChatMessageKey;
type TypeFromKey<Key extends EventKey> = Key extends keyof EventTypeMap
  ? TauMessage<EventTypeMap[Key], Key>
  : Key extends ChatMessageKey
  ? ChatMessage
  : never;

function listen<T extends EventKey>(
  key: T,
  cb: (e: CustomEvent<TypeFromKey<T>>) => void,
  node?: HTMLElement
): () => void {
  const n = node || document;
  n.addEventListener(key, cb as any);
  return () => {
    n.removeEventListener(key, cb as any);
  };
}

export const $ = Object.assign(
  Object.assign(
    (...a: Parameters<(typeof document)["querySelector"]>) =>
      document.querySelector(...a),
    builders
  ),
  { wattr, className, attr, expire, listen, styles, slideUp }
);

// const container = className(wattr(div, { this: "is a test" }), "container");
