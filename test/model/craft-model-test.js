import { assert } from "chai";
import { db } from "../../src/models/db.js"
import { testCrafts, oneCraft } from "../fixtures.js";

suite("Craft Model tests", () => {

  setup(async () => {
    db.init("json");
    await db.craftStore.deleteAllCrafts();
    for (let i = 0; i < testCrafts.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCrafts[i] = await db.craftStore.addCraft(testCrafts[i]);
    }
  });

  test("create a craft", async () => {
    const craft = await db.craftStore.addCraft(oneCraft);
    assert.equal(oneCraft, craft);
    assert.isDefined(craft._id);
  });

  test("delete all crafts", async () => {
    let returnedCrafts = await db.craftStore.getAllCrafts();
    assert.equal(returnedCrafts.length, 3);
    await db.craftStore.deleteAllCrafts();
    returnedCrafts = await db.craftStore.getAllCrafts();
    assert.equal(returnedCrafts.length, 0);
  });

  test("get a craft - success", async () => {
    const craft = await db.craftStore.addCraft(oneCraft);
    const returnedCraft = await db.craftStore.getCraftById(craft._id);
    assert.equal(oneCraft, craft);
  });

  test("delete One Craft - success", async () => {
    const id = testCrafts[0]._id;
    await db.craftStore.deleteCraftById(id);
    const returnedCrafts = await db.craftStore.getAllCrafts();
    assert.equal(returnedCrafts.length, testCrafts.length - 1);
    const deletedCraft = await db.craftStore.getCraftById(id);
    assert.isNull(deletedCraft);
  });

  test("get a craft - bad params", async () => {
    assert.isNull(await db.craftStore.getCraftById(""));
    assert.isNull(await db.craftStore.getCraftById());
  });

  test("delete One Craft - fail", async () => {
    await db.craftStore.deleteCraftById("bad-id");
    const allCrafts = await db.craftStore.getAllCrafts();
    assert.equal(testCrafts.length, allCrafts.length);
  });
});