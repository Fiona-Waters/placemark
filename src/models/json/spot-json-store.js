/**
 * Spot JSON Store model handling Spot related data.
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/spots.json"));
db.data = { spots: [] };

export const spotJsonStore = {
  async getAllSpots() {
    await db.read();
    return db.data.spots;
  },

  async addSpot(craftId, spot) {
    await db.read();
    spot._id = v4();
    spot.craftid = craftId;
    db.data.spots.push(spot);
    await db.write();
    return spot;
  },

  async getSpotsByCraftId(id) {
    await db.read();
    return db.data.spots.filter((spot) => spot.craftid === id);
  },

  async getSpotById(id) {
    await db.read();
    let s = db.data.spots.find((spot) => spot._id === id);
    if (s === undefined) s = null;
    return s;
  },

  async deleteSpot(id) {
    await db.read();
    const index = db.data.spots.findIndex((spot) => spot._id === id);
    db.data.spots.splice(index, 1);
    await db.write();
  },

  async deleteAllSpots() {
    db.data.spots = [];
    await db.write();
  },

  async updateSpot(spot, updatedSpot) {
    spot.placeName = updatedSpot.placeName;
    spot.lat = updatedSpot.lat;
    spot.lng = updatedSpot.lng;
    spot.description = updatedSpot.description;
    spot.category = updatedSpot.category;
    await db.write();
  },
};
