import { assert } from "chai";
import { db } from "../../src/models/db.js"
import {testUsers, testCrafts} from "../fixtures.js";

suite("Analytics Tests", () => {

    setup(async () => {
        db.init("mongo");
        await db.craftStore.deleteAllCrafts();
    },
    
 

});