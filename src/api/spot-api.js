/**
 * Spot Api Functions
 * Each function includes jwt security information, core functionality
 * and api documentation details.
 *
 * @author Fiona Waters
 * @date 05/06/2022
 * @version 4
 */

import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, SpotSpec, SpotSpecPlus, SpotSpecArray } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";
import { validationError } from "./logger.js";

export const spotApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spots = await db.spotStore.getAllSpots();
        return spots;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: SpotSpecArray, failAction: validationError },
    description: "Get all spotApi",
    notes: "Returns all spotApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No spot with this id");
        }
        return spot;
      } catch (err) {
        return Boom.serverUnavailable("No spot with this id");
      }
    },
    tags: ["api"],
    description: "Find a Spot",
    notes: "Returns a spot",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SpotSpecPlus, failAction: validationError },
  },

  findSpotsByCraftId: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const spot = await db.spotStore.getSpotsByCraftId(request.params.id);
        if (!spot) {
          return Boom.notFound("No spot with this id");
        }
        return spot;
      } catch (err) {
        return Boom.serverUnavailable("No spot with this id");
      }
    },
    tags: ["api"],
    description: "Find a Spot",
    notes: "Returns a spot",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SpotSpecArray, failAction: validationError },
  },
  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.addSpot(request.params.id, request.payload);
        if (spot) {
          return h.response(spot).code(201);
        }
        return Boom.badImplementation("error creating spot");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Spot",
    notes: "Returns the newly created spot",
    validate: { payload: SpotSpec },
    response: { schema: SpotSpecPlus, failAction: validationError },
  },
  updateSpot: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.updateSpot(request.params.spotid, request.payload);
        if (spot) {
          return h.response(spot).code(201);
        }
        return Boom.badImplementation("error creating spot");
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a Spot",
    notes: "Returns the updated spot",
    validate: { payload: SpotSpecPlus },
    response: { schema: SpotSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.spotStore.deleteAllSpots();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all spotApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No Spot with this id");
        }
        await db.spotStore.deleteSpot(spot._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Spot with this id");
      }
    },
    tags: ["api"],
    description: "Delete a spot",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await  db.spotStore.getSpotById(request.params.id);
        console.log("HELLO",spot);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const response = await imageStore.uploadImage(request.payload.imagefile);
          spot.images.push({img : response.url,
            imgid: response.public_id})
          db.spotStore.updateSpot(spot._id, spot);
        }
        return h.response().code(200);
      } catch (err) {
        console.log(err);
        return h.response().code(500);
      }
    },
    tags: ["api"],
    description: "Upload an image",
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        await db.imageStore.deleteImage(request.params.imgid);
        console.log("spot",spot.images)
        spot.images = spot.images.filter((value) =>  value.imgid !== request.params.imgid );
        console.log("AH",spot.images)
        db.spotStore.updateSpot(spot._id, spot);
        return h.response().code(200);
      } catch (err) {
        console.log(err);
        return h.response().code(500);
      }
    },
    tags: ["api"],
    description: "Delete an image",
  },

  getSpotsPerCategory: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        return await db.spotStore.getSpotsPerCategory();
      } catch (error) {
        console.log(error)
        return h.response().code(500);
      }
    },
    tags: ["api"],
    description: "Gets number of spots per category",
  }
};
