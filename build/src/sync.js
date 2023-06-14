/* eslint-disable no-console */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sync", {
    enumerable: true,
    get: function() {
        return sync;
    }
});
const _dbInit = require("./utils/dbInit");
const _Phones = require("./models/Phones");
const _Products = require("./models/Products");
const _seedPhones = require("./seeders/seedPhones");
const _seedProducts = require("./seeders/seedProducts");
const sync = async ()=>{
    (0, _dbInit.dbInit)();
    await _Phones.Phones.sync({
        force: true
    });
    await _Products.Products.sync({
        force: true
    });
    await (0, _seedPhones.seedInitialPhones)();
    await (0, _seedProducts.seedInitialProducts)();
};
sync();
