import { assert } from "chai";
import { craftspotService } from "./craftspot-service.js";
import { assertSubset } from "../test-utils.js";
import { donald, oneCraft, testCrafts } from "../fixtures.js";

suite("Craft API Tests", () => {

    let user = null;

    setup(async () => {
        await craftspotService.deleteAllCrafts();
        await craftspotService.deleteAllUsers();
        user = await craftspotService.createUser(donald);
        oneCraft.userid = user._id;
    });

    teardown(async () => {
    });

    test("Create Craft", async () => {
        const returnedCraft = await craftspotService.createCraft(oneCraft);
        console.log(returnedCraft);
        assert.isNotNull(returnedCraft);
        assertSubset(oneCraft, returnedCraft);
    });

    test("Delete a Craft", async () => {
        const craft = await craftspotService.createCraft(oneCraft);
        const response = await craftspotService.deleteCraft(craft._id);
        assert.equal(response.status, 204);
        try {
            const returnedCraft = await craftspotService.getCraft(craft.id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Craft with this id", "Incorrect Response Message");
        }
    });

    test("Create Multiple Crafts", async () => {
        for (let i = 0; i < testCrafts.length; i += 1) {
            testCrafts[i].userid = user._id;
            // eslint-disable-next-line no-await-in-loop
            await craftspotService.createCraft(testCrafts[i]);
        }
        let craftList = await craftspotService.getAllCrafts();
        assert.equal(craftList.length, testCrafts.length);
        await craftspotService.deleteAllCrafts();
        craftList = await craftspotService.getAllCrafts();
        assert.equal(craftList.length, 0);
    });

    test("Remove Non-Existant Craft", async () => {
        try {
            const response = await craftspotService.deleteCraft("not an id");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Craft with this id", "Incorrect Response Message");
        }
    });
});