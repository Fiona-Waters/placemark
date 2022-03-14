import Mongoose from "mongoose";

const { Schema } = Mongoose;

const spotSchema = new Schema({
    placeName: String,
    lat: Number,
    lng: Number,
    description: String,
    category: String,
    craftid: {
        type: Schema.Types.ObjectId,
        ref: "Craft",
    },
});

export const Spot = Mongoose.model("Spot", spotSchema);