import { assert } from "chai";
import { craftspotService } from "./craftspot-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { donald, donaldCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
    setup(async () => {
        craftspotService.clearAuth();
        await craftspotService.createUser(donald);
        await craftspotService.authenticate(donaldCredentials);
        await craftspotService.deleteAllUsers();
    });

    test("Authenticate", async () => {
        const returnedUser = await craftspotService.createUser(donald);
        const response = await craftspotService.authenticate(donaldCredentials);
        assert(response.success);
        assert.isDefined(response.token);
    });

    test("Verify Token", async () => {
        const returnedUser = await craftspotService.createUser(donald);
        const response = await craftspotService.authenticate(donaldCredentials);
        const userInfo = decodeToken(response.token);
        assert.equal(userInfo.email, returnedUser.email);
        assert.equal(userInfo.userId, returnedUser._id);
    });

    test("Check Unauthorised", async () => {
        craftspotService.clearAuth();
        try {
            await craftspotService.deleteAllUsers();
            assert.fail("Route not protected");
        } catch (error) {
           assert.equal(error.response.data.statusCode, 401);
        }
    });
});