import browser from "webextension-polyfill";
import { storage } from "./utils/storage";

/** set init storage data */
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    await storage.set("username", "");
    await storage.set("paid", true);
  }
});
