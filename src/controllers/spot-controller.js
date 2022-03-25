/**
 * Spot controller handling all Spot related actions.
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

import { SpotSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const spotController = {
  index: {
    handler: async function (request, h) {
      const craft = await db.craftStore.getCraftById(request.params.id);
      const spot = await db.spotStore.getSpotById(request.params.spotid);
      const viewData = {
        title: "Edit Spot",
        craft: craft,
        spot: spot,
      };
      return h.view("update-spot-view", viewData);
    },
  },

  update: {
    validate: {
      payload: SpotSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("update-spot-view", { title: "Edit spot error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const newSpot = {
        placeName: request.payload.placeName,
        lat: Number(request.payload.lat),
        lng: Number(request.payload.lng),
        description: request.payload.description,
        category: request.payload.category,
      };
      try {
        await db.spotStore.updateSpot(request.params.spotid, newSpot);
      } catch (error) {
        console.log(error);
      }
      return h.redirect(`/craft/${request.params.id}`);
    },
  },

  showSpotDetails: {
    handler: async function (request, h) {
      const spot = await db.spotStore.getSpotById(request.params.spotid);
      const viewData = {
        title: "Update Spot",
        spot: spot,
      };
      return h.view("update-spot-view", viewData);
    },
  },
};
