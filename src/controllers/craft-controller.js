import { db } from "../models/db.js";
import { SpotSpec } from "../models/joi-schemas.js";

export const craftController = {
  index: {
    handler: async function (request, h) {
      const craft = await db.craftStore.getCraftById(request.params.id);
      const viewData = {
        title: "Craft",
        craft: craft,
      };
      return h.view("craft-view", viewData);
    },
  },

  addSpot: {
    validate: {
      payload: SpotSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentCraft = await db.craftStore.getCraftById(request.params.id);
        return h.view("craft-view", { title: "Error Adding Spot", craft: currentCraft, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const craft = await db.craftStore.getCraftById(request.params.id);
      const newSpot = {
        placeName: request.payload.placeName,
        lat: Number(request.payload.lat),
        lng: Number(request.payload.lng),
        description: request.payload.description
      };
      await db.spotStore.addSpot(craft._id, newSpot);
      return h.redirect(`/craft/${craft._id}`);
    },
  },

  deleteSpot: {
      handler: async function (request, h) {
          const craft = await db.craftStore.getCraftById(request.params.id);
          await db.spotStore.deleteSpot(request.params.spotid);
          return h.redirect(`/craft/${craft._id}`);
      },
  },
};