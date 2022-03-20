import { db } from "../models/db.js";

export const analytics = {

async calculateAnalytics() {
    const averageCraftsPerUser = await analytics.averageCraftsPerUser();
    const averageSpotsPerUser = await analytics.averageSpotsPerUser();
    const averageSpotsPerCraft = await analytics.averageSpotsPerCraft();
    // const leastCrafts = await analytics.leastCrafts();
    //  const mostCrafts = await analytics.mostCrafts();

    return {averageCraftsPerUser, averageSpotsPerUser, averageSpotsPerCraft};
},

  async averageCraftsPerUser() {
    const users = await db.userStore.getAllUsers();
    const crafts = await db.craftStore.getAllCrafts();
    return parseFloat(users.length / crafts.length);
  },

  async averageSpotsPerUser() {
    const users = await db.userStore.getAllUsers();
    const spots = await db.spotStore.getAllSpots();
    return parseFloat(users.length / spots.length);
  },

  async averageSpotsPerCraft() {
    const spots = await db.spotStore.getAllSpots();
    const crafts = await db.craftStore.getAllCrafts();
    return parseFloat(spots.length / crafts.length);
  },

  async leastCrafts() {
    let minValue = 0;
    const users = await db.users.getAllUsers();
    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const userCrafts = await db.craftStore.getUserCrafts(users[i]._id);
      if (userCrafts.length < minValue) {
        minValue = userCrafts.length;
      }
    }
    return minValue;
  },

// most crafts

};





