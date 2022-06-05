/**
 * Spot Mongoose Schema.
 *
 * @author Fiona Waters
 * @date 05/06/2022
 * @version 4
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
