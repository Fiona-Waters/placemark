import { assert } from "chai";
import { craftspotService } from "./craftspot-service.js";
import { assertSubset } from "../test-utils.js";
import { donald, donaldCredentials, oneCraft, oneSpot, testUsers } from "../fixtures.js";
import { craftApi } from "../../src/api/craft-api.js";

const users = new Array(testUsers.length);

suite("User API Tests", () => {
  setup(async () => {
    craftspotService.clearAuth();
    await craftspotService.createUser(donald);
    await craftspotService.authenticate(donaldCredentials);
    await craftspotService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await craftspotService.createUser(testUsers[i]);
    }
    await craftspotService.createUser(donald);
    await craftspotService.authenticate(donaldCredentials);
  });

  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await craftspotService.createUser(donald);
    assertSubset(donald, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await craftspotService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await craftspotService.deleteAllUsers();
    await craftspotService.createUser(donald);
    await craftspotService.authenticate(donaldCredentials);
    returnedUsers = await craftspotService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await craftspotService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - fail", async () => {
    try {
      const returnedUser = await craftspotService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await craftspotService.deleteAllUsers();
    await craftspotService.createUser(donald);
    await craftspotService.authenticate(donaldCredentials);
    try {
      const returnedUser = await craftspotService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("delete a user account", async () => {
    const user = await craftspotService.createUser(donald);
    await craftspotService.authenticate(donaldCredentials);
    const deletedUser = await craftspotService.deleteUser(user._id);
    try {
      const returnedUser = await craftspotService.getUser(user._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
