import { db } from "../models/db.js";
import { CraftSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const crafts = await db.craftStore.getUserCrafts(loggedInUser._id);
      crafts.sort((a, b) => (a.title > b.title ? 1 : -1));
      const viewData = {
        title: "CraftSpot Dashboard",
        user: loggedInUser,
        crafts: crafts,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCraft: {
    validate: {
      payload: CraftSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Error Adding Craft", errors: error.details }).takeover().code(400);
      },
    },
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