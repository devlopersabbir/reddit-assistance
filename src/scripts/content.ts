import Browser from "webextension-polyfill";
import { dispatchEvent, wait } from "../utils";

console.clear();

/**
 * Delete posts & comments
 */
async function deletePostAndComments(ammount: number, name: string) {
  const sure = confirm(`Agree to ${name} ${ammount} post?`);
  if (!sure) return;
  let counter: number = 0;
  const deleteBtns = document.querySelectorAll("[data-event-action=delete]");

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
    await deletePostAndComments(request.ammount, "Posts");
  } else if (request.from === "comments") {
    await deletePostAndComments(request.ammount, "Comments");
  }
});
