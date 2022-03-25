/**
 * Craft controller handling all Craft related actions.
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

import { db } from "../models/db.js";
import { SpotSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

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
        description: request.payload.description,
        category: request.payload.category,
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

  uploadImage: {
    handler: async function (request, h) {
      try {
        const craft = await db.craftStore.getCraftById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const response = await imageStore.uploadImage(request.payload.imagefile);
          craft.img = response.url;
          craft.imgid = response.public_id;
          db.craftStore.updateCraft(craft);
        }
        return h.redirect(`/craft/${craft._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/craft/${craft._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
  // Function allowing deletion of image from app and cloudinary service
  deleteImage: {
    handler: async function (request, h) {
      const craft = await db.craftStore.getCraftById(request.params.id);
      await db.imageStore.deleteImage(craft.imgid);
      craft.img = undefined;
      craft.imgid = undefined;
      db.craftStore.updateCraft(craft);
      return h.redirect(`/craft/${craft._id}`);
    },
  },
};
