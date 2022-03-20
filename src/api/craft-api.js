import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, CraftArraySpec, CraftSpec, CraftSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js"

export const craftApi = {
    find: {
        auth: {
            strategy: "jwt",
          },
        handler: async function (request, h) {
            try {
                const crafts = await db.craftStore.getAllCrafts();
                return crafts;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: { schema: CraftArraySpec, failAction: validationError },
        description: "Get all crafts",
        notes: "Returns all crafts",
    },

    findOne: {
        auth: {
            strategy: "jwt",
          },
        async handler(request) {
            try {
                const craft = await db.craftStore.getCraftById(request.params.id);
                if (!craft) {
                    return Boom.notFound("No Craft with this id");
                }
                return craft;
            } catch (err) {
                return Boom.serverUnavailable("No Craft with this id");
            }
        },
        tags: ["api"],
        description: "Find a Craft",
        notes: "Returns a craft",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: CraftSpecPlus, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
          },
        handler: async function (request, h) {
            try {
                const craft = request.payload;
                const newCraft = await db.craftStore.addCraft(craft);
                if (newCraft) {
                    return h.response(newCraft).code(201);
                }
                return Boom.badImplementation("error creating craft");
            } catch (err) {
                return Boom.serverUnavailable("Database error");
            }
        },
        tags: ["api"],
        description: "Create a Craft",
        notes: "Returns the newly created craft",
        validate: { payload: CraftSpec, failAction: validationError },
        response: { schema: CraftSpecPlus, failAction: validationError },
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
          },
        handler: async function (request, h) {
            try {
                const craft = await db.craftStore.getCraftById(request.params.id);
                if (!craft) {
                    return Boom.notFound("No Craft with this id");
                }
                await db.craftStore.deleteCraftById(craft._id);
                return h.response().code(204);
               } catch (err) {
                return Boom.serverUnavailable("No Craft with this id");
            }
        },
        tags: ["api"],
        description: "Delete a craft",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
          },
        handler: async function (request, h) {
            try {
                await db.craftStore.deleteAllCrafts();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all CraftApi",
    },
};