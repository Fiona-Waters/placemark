import { craftApi } from "./api/craft-api.js";
import { userApi } from "./api/user-api.js";
import { spotApi } from "./api/spot-api.js";
import { analyticsApi } from "./api/analytics-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "GET", path: "/api/users/loggedInUser", config: userApi.getLoggedInUser },
  { method: "POST", path: "/api/users/updateUser/{id}", config: userApi.updateUser},

  { method: "POST", path: "/api/crafts", config: craftApi.create },
  { method: "DELETE", path: "/api/crafts", config: craftApi.deleteAll },
  { method: "GET", path: "/api/crafts", config: craftApi.find },
  { method: "GET", path: "/api/crafts/usercrafts", config: craftApi.findByUserId },
  { method: "GET", path: "/api/crafts/{id}", config: craftApi.findOne },
  { method: "DELETE", path: "/api/crafts/{id}", config: craftApi.deleteOne },

  { method: "GET", path: "/api/spots", config: spotApi.find },
  { method: "GET", path: "/api/spots/{id}", config: spotApi.findOne },
  { method: "GET",path: "/api/crafts/{id}/spots", config: spotApi.findSpotsByCraftId },
  { method: "POST", path: "/api/crafts/{id}/spots", config: spotApi.create },
  { method: "POST", path: "/api/crafts/{id}/spots/{spotid}", config: spotApi.updateSpot},
  { method: "DELETE", path: "/api/spots", config: spotApi.deleteAll },
  { method: "DELETE", path: "/api/spots/{id}", config: spotApi.deleteOne },
  { method: "POST", path: "/api/spots/{id}/uploadimage", config: spotApi.uploadImage },
  { method: "DELETE", path: "/api/spots/{id}/deleteimage/{imgid}", config: spotApi.deleteImage },
  { method: "GET", path: "/api/spots/categories", config: spotApi.getSpotsPerCategory },

  { method: "GET", path: "/api/analytics", config: analyticsApi.calculate }
];
