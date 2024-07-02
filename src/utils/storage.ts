import Browser from "webextension-polyfill";

export const storage = {
  get: async <T = StorageResponse>(keys: StorageKeys[]): Promise<T> => {
    let localStorage = await Browser.storage.local.get(keys);
    const items = localStorage as T;
    return items;
  },

  set: async <T = StorageResponse>(
    key: StorageKeys,
    value: T
  ): Promise<void> => {
    await Browser.storage.local.set({ [key]: value });
    return;
  },
};
