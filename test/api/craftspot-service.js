import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const craftspotService = {
  craftspotUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.craftspotUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.craftspotUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.craftspotUrl}/api/users`);
    return res.data;
  },

  async deleteUser(id) {
    console.log("Hello1");
    const res = await axios.delete(`${this.craftspotUrl}/api/users/${id}`);
    console.log("hello2");
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.craftspotUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.craftspotUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },

  async createCraft(craft) {
    const res = await axios.post(`${this.craftspotUrl}/api/crafts`, craft);
    return res.data;
  },

  async deleteAllCrafts() {
    const response = await axios.delete(`${this.craftspotUrl}/api/crafts`);
    return response.data;
  },

  async deleteCraft(id) {
    const response = await axios.delete(`${this.craftspotUrl}/api/crafts/${id}`);
    return response;
  },

  async getAllCrafts() {
    const res = await axios.get(`${this.craftspotUrl}/api/crafts`);
    return res.data;
  },

  async getCraft(id) {
    const res = await axios.get(`${this.craftspotUrl}/api/crafts/${id}`);
    return res.data;
  },

  async getAllSpots() {
    const res = await axios.get(`${this.craftspotUrl}/api/spots`);
    return res.data;
  },

  async createSpot(craftid, spot) {
    spot.craftid = craftid;
    const res = await axios.post(`${this.craftspotUrl}/api/crafts/${craftid}/spots`, spot);
    return res.data;
  },

  async getSpot(id) {
    try {
      const res = await axios.get(`${this.craftspotUrl}/api/spots/${id}`);
      return res.data;
    } catch (error) {
      console.log("no such id");
      return null;
    }
  },

  async deleteSpot(id) {
    try {
      await axios.delete(`${this.craftspotUrl}/api/spots/${id}`);
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllSpots() {
    const res = await axios.delete(`${this.craftspotUrl}/api/spots`);
    return res.data;
  },

  async updateSpot(spot, updatedSpot) {
    spot.placeName = updatedSpot.placeName;
    spot.lat = updatedSpot.lat;
    spot.lng = updatedSpot.lng;
    spot.description = updatedSpot.description;
    await axios.put(`${this.craftspotUrl}/api/spots`);
  },
};
