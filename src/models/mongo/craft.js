import Mongoose from "mongoose";

const { Schema } = Mongoose;

const craftSchema = new Schema({
    title: String,
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export const Craft = Mongoose.model("Craft", craftSchema);