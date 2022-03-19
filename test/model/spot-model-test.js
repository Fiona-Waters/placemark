import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { oneCraft, oneSpot, testCrafts, testSpots } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Spot Model tests", () => {

    let newCraftList = null;

  setup(async () => {
    db.init("mongo");
    await db.craftStore.deleteAllCrafts();
    await db.spotStore.deleteAllSpots();
    newCraftList = await db.craftStore.addCraft(oneCraft)
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testSpots[i] = await db.spotStore.addSpot(newCraftList._id, testSpots[i]);
    }
  });

  test("create a spot", async () => {
    const craft = await db.craftStore.getAllCrafts();
    const spot = await db.spotStore.addSpot(craft[0]._id, oneSpot)
    assert.isNotNull(spot._id);
    assertSubset (oneSpot, spot);
  });

  test("delete all spots", async () => {
    await db.spotStore.deleteAllSpots();
    const newSpots = await db.spotStore.getAllSpots();
    assert.equal(0, newSpots.length);
  });

  test("get a spot - success", async () => {
    const spotList = await db.craftStore.addCraft(oneCraft);
    const spot = await db.spotStore.addSpot(spotList._id, oneSpot);
    const newSpot = await db.spotStore.getSpotById(spot._id);
    assertSubset(oneSpot, newSpot)
  });


  test("delete One Spot - success", async () => {
    const id = testSpots[0]._id;
    await db.spotStore.deleteSpot(id);
    const spots = await db.spotStore.getAllSpots();
    assert.equal(spots.length, testSpots.length -1);
    const deletedSpot = await db.spotStore.getSpotById(id);
    assert.isNull(deletedSpot);
  });

  test("get a spot - bad params", async () => {
    assert.isNull(await db.spotStore.getSpotById(""));
    assert.isNull(await db.spotStore.getSpotById());
  });

  test("delete One Spot - fail", async () => {
    await db.spotStore.deleteSpot("bad-id");
    const spots = await db.spotStore.getAllSpots();
    assert.equal(spots.length, testCrafts.length);
  });
});