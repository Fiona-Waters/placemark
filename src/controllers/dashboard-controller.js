import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const crafts = await db.craftStore.getUserCrafts(loggedInUser._id);
      const viewData = {
        title: "CraftSpot Dashboard",
        user: loggedInUser,
        crafts: crafts,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCraft: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCraft = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.craftStore.addCraft(newCraft);
      return h.redirect("/dashboard");
    },
  },

  deleteCraft: {
    handler: async function (request, h) {
      const craft = await db.craftStore.getCraftById(request.params.id);
      await db.craftStore.deleteCraftById(craft._id);
      return h.redirect("/dashboard");
    }
  }
};