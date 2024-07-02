import Browser from "webextension-polyfill";
import { dispatchEvent, wait } from "../utils";
console.clear();

/**
 * Delete posts
 */
async function deletePost(ammount: number) {
  let counter: number = 0;
  // getting all delete buttons
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
      await wait();
      counter++;
    }
  }
}

/**
 * Delete comments
 */
function deleteComments(ammount: number) {
  console.log("number");
}

Browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  switch (request.from) {
    case "post":
      deletePost(request.ammount);
      break;
    case "comments":
      deleteComments(request.ammount);
      break;
    default:
      break;
  }
});
