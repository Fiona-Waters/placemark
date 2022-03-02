import { userMemStore } from "./mem/user-mem-store.js";
import { craftMemStore } from "./mem/craft-mem-store.js";
import { spotMemStore } from "./mem/spot-mem-store.js";

export const db = {
  userStore: null,
  craftStore: null,
  spotStore: null,

  init() {
    this.userStore = userMemStore;
    this.craftStore = craftMemStore;
    this.spotStore = spotMemStore;
  },
};