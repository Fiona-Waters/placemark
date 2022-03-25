/**
 * Craft JSON Store model handling Craft related data.
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { spotJsonStore } from "./spot-json-store.js";

const db = new Low(new JSONFile("./src/models/json/crafts.json"));
db.data = { crafts: [] };

export const craftJsonStore = {
  async getAllCrafts() {
    await db.read();
    return db.data.crafts;
  },

  async addCraft(craft) {
    await db.read();
    craft._id = v4();
    db.data.crafts.push(craft);
    await db.write();
    return craft;
  },

  async getCraftById(id) {
    await db.read();
    let list = db.data.crafts.find((craft) => craft._id === id);
    if (list) {
      list.spots = await spotJsonStore.getSpotsByCraftId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserCrafts(userid) {
    await db.read();
    return db.data.crafts.filter((craft) => craft.userid === userid);
  },

  async deleteCraftById(id) {
    await db.read();
    const index = db.data.crafts.findIndex((craft) => craft._id === id);
    if (index !== -1) db.data.crafts.splice(index, 1);
    await db.write();
  },

  async deleteAllCrafts() {
    db.data.crafts = [];
    await db.write();
  },
};
