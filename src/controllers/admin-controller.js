import { db } from "../models/db.js";
import { analytics } from "../utils/analytics.js";

export const adminController = {
  index: {
    plugins:{
      hacli: {
        permissions: [ "ADMIN" ]
      }
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const crafts = await db.craftStore.getAllCrafts();
      const spots = await db.spotStore.getAllSpots();
      const results = await analytics.calculateAnalytics();
      const viewData = {
        title: "CraftSpot Admin Dashboard",
        users: users,
        crafts: crafts,
        spots: spots,
        results: results,
      };
        return h.view("admin-dashboard-view", viewData);
  },
},

  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/admin-dashboard");
    }
  },

};