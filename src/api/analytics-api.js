/**
 * Analytics Api Functions
 * Functions allowing analytics information to be available
 *
 * @author Fiona Waters
 * @date 26/05/2022
 * @version 3
 * 
 */

import { Boom } from "@hapi/boom";
import { analytics } from "../utils/analytics.js";

export const analyticsApi = {

    calculate: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const results = await analytics.calculateAnalytics();
                if(results) {
                    return h.response(results).code(201);
                }
                return Boom.badImplementation("error calculating analytics");
            } catch (err) {
                return Boom.serverUnavailable("Datebase Error")
            }
        },
        tags: ["api"],
        description: "Calculate analytics",
        notes: "Calculates and returns analytics information",
    }

}