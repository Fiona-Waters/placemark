import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const craftApi = {
    find: {
        auth: false,
        handler: async function (request, h) {
            try {
                const crafts = await db.craftStore.getAllCrafts();
                return crafts;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    findOne: {
        auth: false,
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
    },

    create: {
        auth: false,
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
    },

    deleteOne: {
        auth: false,
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
    },

    deleteAll: {
        auth: false,
        handler: async function (request, h) {
            try {
                await db.craftStore.deleteAllCrafts();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
};