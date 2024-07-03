import Browser from "webextension-polyfill";
import { dispatchEvent, wait } from "../utils";

console.clear();

/**
 * Delete posts & comments
 */
async function deleteEverything(ammount: number, name: string) {
  const sure = confirm(` Agree to delete ${ammount} ${name}?`);
  if (!sure) return;
  let counter: number = 0;
  let buttons = document.querySelectorAll("[data-event-action=delete]");
  if (buttons.length === 0)
    buttons = document.querySelectorAll("[data-event-action=delete_message]");
  const deleteBtns = Array.from(buttons);

  console.log("button: ", deleteBtns);
  for (const dbtn of deleteBtns) {
    if (counter >= ammount) break;
    if (dbtn) {
      dispatchEvent(dbtn);
    }
    await wait();
    const confirm = document.querySelector(`span.option.error.active > a.yes`);
    if (confirm) {
      await wait();
      dispatchEvent(confirm);
      await wait(400);
      counter++;
    }
  }
}

Browser.runtime.onMessage.addListener(async (request) => {
  if (request.from === "post") {
    await deleteEverything(request.ammount, "Posts");
  } else if (request.from === "comments") {
    await deleteEverything(request.ammount, "Comments");
  } else if (request.from === "messages") {
    await deleteEverything(request.ammount, "Messages");
  }
});
