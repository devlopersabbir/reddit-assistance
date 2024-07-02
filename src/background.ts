import browser from "webextension-polyfill";
import { storage } from "./utils/storage";

browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    await storage.set("username", null);
    await storage.set("paid", true);
  }
});

browser.runtime.onMessage.addListener(async (message) => {
  if (message.action === "deletePost" || message.action === "deleteComment") {
    const tab = await browser.tabs.create({ url: message.url, active: true });

    browser.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === tab.id && info.status === "complete") {
        browser.tabs.onUpdated.removeListener(listener);
        browser.tabs.sendMessage(tab.id, {
          from: message.action === "deletePost" ? "post" : "comments",
          ammount: message.ammount,
        });
      }
    });
  }
});
