import { Craft } from "./craft.js";
import { spotMongoStore } from "./spot-mongo-store.js";

export const craftMongoStore = {
    async getAllCrafts() {
        const crafts = await Craft.find().lean;
        return crafts;
    },

    async getCraftById(id) {
        if (id) {
            const craft = await Craft.findOne({ _id: id }).lean();
            if (craft) {
                craft.spots = await spotMongoStore.getSpotsByCraftId(craft._id);
            }
            return craft;
        }
        return null;
    },

    async addCraft(craft) {
        const newCraft = new Craft(craft);
        const craftObj = await newCraft.save();
        return this.getCraftById(craftObj._id);
    },

    async getUserCrafts(id) {
        const craft = await Craft.find({ userid: id }).lean();
        return craft;
    },

    async deleteCraftById(id) {
        try {
            await Craft.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllCrafts() {
        await Craft.deleteMany({});
    }
}