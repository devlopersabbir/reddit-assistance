import browser from "webextension-polyfill";
import { storage } from "./utils/storage";
import ExtPay from "extpay";

const extpay = ExtPay("reddit-assistance");
extpay.startBackground();

extpay.getUser().then((user) => {
  console.log("user: ", user);
  if (user.paid) {
    console.log("user is paied");
  } else {
    console.log("unpaid");
  }
});

browser.runtime.onMessage.addListener((message) => {
  if (message.payment) {
    extpay.openPaymentPage();
  }
});

browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    await storage.set("username", null);
    await storage.set("paid", true);
  }
});

browser.runtime.onMessage.addListener(async (message) => {
  if (
    message.action === "deletePost" ||
    message.action === "deleteComment" ||
    message.action === "deleteMessage"
  ) {
    const tab = await browser.tabs.create({ url: message.url, active: true });

    browser.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === tab.id && info.status === "complete") {
        browser.tabs.onUpdated.removeListener(listener);
        browser.tabs.sendMessage(tab.id, {
          from:
            message.action === "deletePost"
              ? "post"
              : message.action === "deleteComment"
              ? "comments"
              : "messages",
          ammount: message.ammount,
        });
      }
    });
  }
});
