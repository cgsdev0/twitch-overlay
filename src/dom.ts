import { EventTypeMap } from "./tau_types";

type NodeArray = Parameters<ParentNode["append"]>;
const builder =
  <T extends keyof HTMLElementTagNameMap>(type: T) =>
  (...that: NodeArray) => {
    const newEl = document.createElement(type);
    newEl.append(...that);
    return newEl;
  };

const builderNames = ["div", "p", "span", "strong", "em"] as const;
export type Builders = {
  [K in (typeof builderNames)[number]]: ReturnType<typeof builder<K>>;
};
const builders: Builders = {} as Builders;
builderNames.forEach((name) => ((builders as any)[name] = builder(name)));

type Constraint = ReturnType<typeof builder>;
export const attr =
  <T extends Constraint>(base: T) =>
  (attributes: Record<string, string>, ...that: NodeArray) => {
    const el = base(...that);
    Object.entries(attributes).forEach(([attr, val]) => {
      el.setAttribute(attr, val);
    });
    return el;
  };
export const wattr =
  <T extends Constraint>(base: T, attributes: Record<string, string>) =>
  (...that: NodeArray) => {
    const el = base(...that);
    Object.entries(attributes).forEach(([attr, val]) => {
      el.setAttribute(attr, val);
    });
    return el;
  };
export const className =
  <T extends Constraint>(base: T, className: string) =>
  (...that: NodeArray) => {
    const el = base(...that);
    el.className = className;
    return el;
  };

export const expire = <T extends ReturnType<Constraint>>(
  after: number,
  el: T,
  transitionOut?: string
) => {
  setTimeout(() => {
    el.remove();
  }, after);
  return el;
};

type CrappyBoolean = "0" | "1";
type ChatMessageKey = "chat-message";
interface Emote {
  id: string;
  positions: [number, number];
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
      badges: string;
      "client-nonce": string;
      color: string;
      "display-name": string;
      "emote-only"?: CrappyBoolean;
      emotes: Emote;
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

type EventKey = keyof EventTypeMap | ChatMessageKey;
type TypeFromKey<Key extends EventKey> = Key extends keyof EventTypeMap
  ? EventTypeMap[Key]
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
  { wattr, className, attr, expire, listen }
);

// const container = className(wattr(div, { this: "is a test" }), "container");
