import browser from "webextension-polyfill";
import { storage } from "./utils/storage";

/** set init storage data */
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    await storage.set("username", null);
    await storage.set("paid", true);
  }
});

browser.runtime.onMessage.addListener(async (message) => {
  if (message.from === "post" || message.from === "comments") {
    browser.tabs.sendMessage(message.tabId, message);
  }
});
