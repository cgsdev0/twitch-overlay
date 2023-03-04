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

export const $ = Object.assign(
  Object.assign(
    (...a: Parameters<(typeof document)["querySelector"]>) =>
      document.querySelector(...a),
    builders
  ),
  { wattr, className, attr, expire }
);

// const container = className(wattr(div, { this: "is a test" }), "container");
