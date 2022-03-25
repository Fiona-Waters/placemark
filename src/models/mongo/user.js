/**
 * User Mongoose Schema.
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

import Mongoose from "mongoose";
import Boom from "@hapi/boom";

const { Schema } = Mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permission: String,
});

export const User = Mongoose.model("User", userSchema);
