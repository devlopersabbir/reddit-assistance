export function floatingButton(innerText: string) {
  const btn = document.createElement("button");
  btn.innerText = innerText;
  btn.style.position = "fixed";
  btn.style.left = "20px";
  btn.style.bottom = "20px";
  btn.className = "floating__button";
  return btn;
}

export async function wait(duration: number = 2000) {
  return new Promise((resolve) => setTimeout(() => resolve(true), duration));
}

export function dispatchEvent(el: Element) {
  let clickEvent = new Event("click", {
    cancelable: true,
    bubbles: true,
    composed: true,
  });
  el.dispatchEvent(clickEvent);
}

export function pathName(url: string) {
  const match = url.match(/\/user\/[^/]+\/([^/]+)/);
  if (!match) return;
  return match[1];
}

export const TEXTS = [
  { path: "submitted", short: "DP" },
  { path: "comments", short: "DC" },
];
