/**
 * Craft Mongoose Schema.
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const craftSchema = new Schema({
  title: String,
  img: String,
  imgid: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Craft = Mongoose.model("Craft", craftSchema);
