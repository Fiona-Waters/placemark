import Hapi from "@hapi/hapi";
import hapiError from "hapi-error";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import Vision from "@hapi/vision";
import * as hacli from "@antoniogiordano/hacli";
import Handlebars from "handlebars";
import path from "path";
import Joi from "joi";
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  await server.register(Vision);
  await server.register(Cookie);
  
  await server.register(
    {
      plugin:hacli, 
      options:{
		    permissions: [ "ADMIN", "USER" ]
      }
    });
  await server.register(hapiError);
  const config = {
    statusCodes: {
      403: { message: "Sorry, you do not have access to this area" },
    }
  };
  server.validator(Joi);
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validateFunc: accountsController.validate,
  });
  server.auth.default("session");
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  db.init("json");
  server.route(webRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();