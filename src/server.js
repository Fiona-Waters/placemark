import Hapi from "@hapi/hapi";
import hapiError from "hapi-error";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import Vision from "@hapi/vision";
import * as hacli from "@antoniogiordano/hacli";
import Handlebars from "handlebars";
import path from "path";
import Joi from "joi";
import hapiSwagger from "hapi-swagger";
import Inert from "@hapi/inert";
import { fileURLToPath } from "url";
import jwt from "hapi-auth-jwt2";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { validate } from "./api/jwt-utils.js";

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  // process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  info: {
    title: "CraftSpot API",
    version: "0.1",
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [{ jwt: [] }],
};

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "localhost",
    routes: {
      cors: true
    }
  });
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register({
    plugin: hacli,
    options: {
      permissions: ["ADMIN", "USER"],
    },
  });
  await server.register(hapiError);
  const config = {
    statusCodes: {
      403: { message: "Sorry, you do not have access to this area" },
    },
  };
  await server.register([
    Inert,
    Vision,
    {
      plugin: hapiSwagger,
      options: swaggerOptions,
    },
  ]);
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
  await server.register(jwt);
  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
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
  db.init("mongo");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
