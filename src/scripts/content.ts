import Browser from "webextension-polyfill";
import { dispatchEvent, wait } from "../utils";
console.clear();

/**
 * Delete posts & comments
 */
async function deleteEverything({ from, ammount }: TFeatures) {
  const sure = confirm(`Agree to delete ${ammount} ${from}?`);
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

Browser.runtime.onMessage.addListener(async (request: TFeatures) => {
  switch (request.from) {
    case "POSTS":
      await deleteEverything({ from: "POSTS", ammount: request.ammount });
      break;
    case "COMMENTS":
      await deleteEverything({ from: "COMMENTS", ammount: request.ammount });
      break;
    case "MESSAGES":
      await deleteEverything({ from: "MESSAGES", ammount: request.ammount });
      break;
    // You can add more cases here if needed
    default:
      console.log(`Unknown request type: ${request.from}`);
  }
});
