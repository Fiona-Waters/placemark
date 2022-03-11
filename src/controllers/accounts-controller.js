import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";


export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to CraftSpot" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for CraftSpot" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to CraftSpot" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log In Error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id});
      return h.redirect("/dashboard");
    },
  },
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  // I don't think I'm using this? Maybe use it to tidy up 2 methods below?
  async getCurrentUser(request) {
    const loggedInUser = request.auth.credentials;
    return loggedInUser;  
  },

  showUserDetails: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "My Account",
        user: user,
      };
      return h.view("my-account-view", viewData);
    }
  },

  updateUserDetails: {
    handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;
    const user = await db.userStore.getUserById(loggedInUser._id);
    user.firstName = request.payload.firstName;
    user.lastName = request.payload.lastName;
    user.email = request.payload.email;
    user.password = request.payload.password;
    await db.userStore.save();
    console.log(user);
    return h.view("login-view");
    }
  },
 
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id); //
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },

  };

