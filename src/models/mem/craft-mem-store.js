import { v4 } from "uuid";

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
    return crafts.find((craft) => craft._id === id);
  },

  async deleteCraftById(id) {
    const index = crafts.findIndex((craft) => craft._id === id);
    crafts.splice(index, 1);
  },

  async deleteAllCrafts() {
    crafts = [];
  },

  async getUserCrafts(userid) {
    return crafts.filter((craft) => craft.userid === userid);
  },
};