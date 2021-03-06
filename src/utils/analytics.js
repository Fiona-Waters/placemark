/**
 * Data Analytics Functions
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

import { db } from "../models/db.js";

export const analytics = {
  async calculateAnalytics() {
    const averageCraftsPerUser = await analytics.averageCraftsPerUser();
    const averageSpotsPerUser = await analytics.averageSpotsPerUser();
    const averageSpotsPerCraft = await analytics.averageSpotsPerCraft();
    const leastCrafts = await analytics.leastCrafts();
    const mostCrafts = await analytics.mostCrafts();

    return { averageCraftsPerUser, averageSpotsPerUser, averageSpotsPerCraft, leastCrafts, mostCrafts };
  },

  async averageCraftsPerUser() {
    const users = await db.userStore.getAllUsers();
    const crafts = await db.craftStore.getAllCrafts();
    return parseFloat(crafts.length / users.length).toFixed(2);
  },

  async averageSpotsPerUser() {
    const users = await db.userStore.getAllUsers();
    const spots = await db.spotStore.getAllSpots();
    return parseFloat(spots.length / users.length).toFixed(2);
  },

  async averageSpotsPerCraft() {
    const spots = await db.spotStore.getAllSpots();
    const crafts = await db.craftStore.getAllCrafts();
    return parseFloat(spots.length / crafts.length).toFixed(2);
  },

  async leastCrafts() {
    let minValue = null;
    const users = await db.userStore.getAllUsers();
    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const userCrafts = await db.craftStore.getUserCrafts(users[i]._id);
      if (minValue === null) {
        minValue = userCrafts.length;
      }
      else if (userCrafts.length < minValue) {
        minValue = userCrafts.length;
      }
    }
    return minValue;
  },

  async mostCrafts() {
    let maxValue = 0;
    const users = await db.userStore.getAllUsers();
    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const userCrafts = await db.craftStore.getUserCrafts(users[i]._id);
      if (userCrafts.length > maxValue) {
        maxValue = userCrafts.length;
      }
    }
    return maxValue;
  },
};
