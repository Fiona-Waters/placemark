// import { userMemStore } from "./mem/user-mem-store.js";
// import { craftMemStore } from "./mem/craft-mem-store.js";
// import { spotMemStore } from "./mem/spot-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { craftJsonStore } from "./json/craft-json-store.js";
import { spotJsonStore } from "./json/spot-json-store.js";

export const db = {
  userStore: null,
  craftStore: null,
  spotStore: null,

  init() {
    this.userStore = userJsonStore;
    this.craftStore = craftJsonStore;
    this.spotStore = spotJsonStore;
  },
};