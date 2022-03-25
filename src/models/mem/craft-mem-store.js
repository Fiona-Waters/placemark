/**
 * Craft Memory Store model handling Craft related data.
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

import { v4 } from "uuid";
import { spotMemStore } from "./spot-mem-store.js";

let crafts = [];

export const craftMemStore = {
  async getAllCrafts() {
    return crafts;
  },

  async addCraft(craft) {
    craft._id = v4();
    crafts.push(craft);
    return craft;
  },

  async getCraftById(id) {
    const list = crafts.find((craft) => craft._id === id);
    if (list) {
      list.spots = await spotMemStore.getSpotsByCraftId(list._id);
      return list;
    }
    return null;
  },

  async deleteCraftById(id) {
    const index = crafts.findIndex((craft) => craft._id === id);
    if (index !== -1) crafts.splice(index, 1);
  },

  async deleteAllCrafts() {
    crafts = [];
  },

  async getUserCrafts(userid) {
    return crafts.filter((craft) => craft.userid === userid);
  },
};
