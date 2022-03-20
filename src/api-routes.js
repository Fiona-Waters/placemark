import { craftApi } from "./api/craft-api.js";
import { userApi } from "./api/user-api.js";
import { spotApi } from "./api/spot-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/crafts", config: craftApi.create },
  { method: "DELETE", path: "/api/crafts", config: craftApi.deleteAll },
  { method: "GET", path: "/api/crafts", config: craftApi.find },
  { method: "GET", path: "/api/crafts/{id}", config: craftApi.findOne },
  { method: "DELETE", path: "/api/crafts/{id}", config: craftApi.deleteOne },

  { method: "GET", path: "/api/spots", config: spotApi.find },
  { method: "GET", path: "/api/spots/{id}", config: spotApi.findOne },
  { method: "POST", path: "/api/crafts/{id}/spots", config: spotApi.create },
  { method: "DELETE", path: "/api/spots", config: spotApi.deleteAll },
  { method: "DELETE", path: "/api/spots/{id}", config: spotApi.deleteOne },

];