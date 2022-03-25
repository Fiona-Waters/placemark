/**
 * Spot Mongo Store model handling Spot related data.
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

import { spotMemStore } from "../mem/spot-mem-store.js";
import { Spot } from "./spot.js";

export const spotMongoStore = {
  async getAllSpots() {
    const spots = await Spot.find().lean();
    return spots;
  },

  async addSpot(craftId, spot) {
    spot.craftid = craftId;
    const newSpot = new Spot(spot);
    const spotObj = await newSpot.save();
    return this.getSpotById(spotObj._id);
  },

  async getSpotsByCraftId(id) {
    const spots = await Spot.find({ craftid: id }).lean();
    return spots;
  },

  async getSpotById(id) {
    if (id) {
      const spot = await Spot.findOne({ _id: id }).lean();
      return spot;
    }
    return null;
  },

  async deleteSpot(id) {
    try {
      await Spot.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllSpots() {
    await Spot.deleteMany({});
  },

  async updateSpot(spotid, updatedSpot) {
    const spot = await Spot.findOne({ _id: spotid });
    spot.placeName = updatedSpot.placeName;
    spot.lat = updatedSpot.lat;
    spot.lng = updatedSpot.lng;
    spot.description = updatedSpot.description;
    spot.category = updatedSpot.category;
    await spot.save();
  },
};
