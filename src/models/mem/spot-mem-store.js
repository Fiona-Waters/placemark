import { v4 } from "uuid";

let spots = [];

export const spotMemStore = {
  async getAllSpots() {
    return spots;
  },

  async addSpot(craftId, spot) {
    spot._id = v4();
    spot.craftid = craftId;
    spots.push(spot);
    return spot;
  },

  async getSpotsByCraftId(id) {
    return spots.filter((spot) => spot.craftid === id);
  },

  async getSpotById(id) {
    return spots.find((spot) => spot._id === id);
  },

  async getCraftSpots(craftid) {
    return spots.filter((spot) => spot.craftid === craftId);
  },

  async deleteSpot(id) {
    const index = spots.findIndex((spot) => spot._id === id);
    spots.splice(index, 1);
  },

  async deleteAllSpots() {
    spots = [];
  },

  async updateSpot(spot, updatedSpot) {
    spot.placeName = updatedSpot.placeName;
    spot.lat = updatedSpot.lat;
    spot.lng = updatedSpot.lng;
    spot.description = updatedSpot.description;
  },
};