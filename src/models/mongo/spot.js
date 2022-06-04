/**
 * Spot Mongoose Schema.
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const spotSchema = new Schema({
  placeName: String,
  lat: Number,
  lng: Number,
  description: String,
  category: String,
  images: 
   [ {
      img: String,
      imgid: String
    }],
  craftid: {
    type: Schema.Types.ObjectId,
    ref: "Craft",
  },
});

export const Spot = Mongoose.model("Spot", spotSchema);
