import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { craftController } from "./controllers/craft-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { spotController } from "./controllers/spot-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcraft", config: dashboardController.addCraft },
  { method: "GET", path: "/admin-dashboard", config: adminController.index },
  { method: "GET", path: "/admin-dashboard/deleteuser/{id}", config: adminController.deleteUser },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/craft/{id}", config: craftController.index },
  { method: "POST", path: "/craft/{id}/addspot", config: craftController.addSpot },
  { method: "GET", path: "/dashboard/deletecraft/{id}", config: dashboardController.deleteCraft },
  { method: "GET", path: "/craft/{id}/deletespot/{spotid}", config: craftController.deleteSpot },

  { method: "GET", path: "/craft/{id}/spot/{spotid}", config: spotController.showSpotDetails },
  { method: "POST", path: "/craft/{id}/spot/{spotid}", config: spotController.update },

  { method: "GET", path: "/my-account", config: accountsController.showUserDetails },
  { method: "POST", path: "/updateuserdetails", config: accountsController.updateUserDetails},

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }

];
