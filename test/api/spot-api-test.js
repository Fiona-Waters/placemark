import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { craftspotService } from "./craftspot-service.js";
import { donald, oneCraft, testCrafts, testSpots, oneSpot, donaldCredentials } from "../fixtures.js";

suite("Spot API Tests", () => {
  let user = null;
  let craftExample = null;

  setup(async () => {
    craftspotService.clearAuth();
    user = await craftspotService.createUser(donald);
    await craftspotService.authenticate(donaldCredentials);
    await craftspotService.deleteAllCrafts();
    await craftspotService.deleteAllSpots();
    await craftspotService.deleteAllUsers();
    user = await craftspotService.createUser(donald);
    await craftspotService.authenticate(donaldCredentials);
    oneCraft.userid = user._id;
    craftExample = await craftspotService.createCraft(oneCraft);
  });

  teardown(async () => {});

  test("Create Spot", async () => {
    const returnedSpot = await craftspotService.createSpot(craftExample._id, oneSpot);
    assertSubset(oneSpot, returnedSpot);
  });

  test("Create Multiple Spots", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await craftspotService.createSpot(craftExample._id, testSpots[i]);
    }
    const returnedSpots = await craftspotService.getAllSpots();
    assert.equal(returnedSpots.length, testSpots.length);
    for (let i = 0; i < returnedSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const spot = await craftspotService.getSpot(returnedSpots[i]._id);
      assertSubset(spot, returnedSpots[i]);
    }
  });

  test("Delete Spot Api", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await craftspotService.createSpot(craftExample._id, testSpots[i]);
    }
    let returnedSpots = await craftspotService.getAllSpots();
    assert.equal(returnedSpots.length, testSpots.length);
    for (let i = 0; i < returnedSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const spot = await craftspotService.deleteSpot(returnedSpots[i]._id);
    }
    returnedSpots = await craftspotService.getAllSpots();
    assert.equal(returnedSpots.length, 0);
  });

  test("Denormalised Craft", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await craftspotService.createSpot(craftExample._id, testSpots[i]);
    }
    const returnedCraft = await craftspotService.getCraft(craftExample._id);
    assert.equal(returnedCraft.spots.length, testSpots.length);
    for (let i = 0; i < testSpots.length; i += 1) {
      assertSubset(testSpots[i], returnedCraft.spots[i]);
    }
  });
});