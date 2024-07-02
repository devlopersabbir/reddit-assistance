import { TEXTS, dispatchEvent, floatingButton, pathName, wait } from "../utils";

console.clear();

function main(btn: HTMLButtonElement) {
  // getting all delete buttons
  const deleteBtns = document.querySelectorAll("[data-event-action=delete]");

  if (btn) {
    btn.addEventListener("click", async () => {
      for (const dbtn of deleteBtns) {
        if (dbtn) {
          dispatchEvent(dbtn);
        }
        await wait();
        const confirm = document.querySelector(
          `span.option.error.active > a.yes`
        );
        if (confirm) {
          await wait();
          dispatchEvent(confirm);
          await wait();
        }
        console.log("finished");
      }
    });
  }
}

const path = pathName(window.location.href);
const pname = TEXTS.forEach(
  (element) => element.path === path && element.short
);

document.querySelector("body")?.appendChild(floatingButton());
main(document.querySelector(".floating__button") as HTMLButtonElement);
