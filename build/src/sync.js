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
const _Cart = require("./models/Cart");
const _Favorites = require("./models/Favorites");
const _OrderDetails = require("./models/OrderDetails");
const _Orders = require("./models/Orders");
const _Users = require("./models/Users");
const _seedPhones = require("./seeders/seedPhones");
const _seedProducts = require("./seeders/seedProducts");
const sync = async ()=>{
    try {
        (0, _dbInit.dbInit)();
        await _Phones.Phones.sync({
            alter: true
        });
        await _Products.Products.sync({
            alter: true
        });
        await _Users.Users.sync({
            alter: true
        });
        await _Orders.Orders.sync({
            alter: true
        });
        await _OrderDetails.OrderDetails.sync({
            alter: true
        });
        await _Cart.Cart.sync({
            alter: true
        });
        await _Favorites.Favorites.sync({
            alter: true
        });
        await (0, _seedPhones.seedInitialPhones)();
        await (0, _seedProducts.seedInitialProducts)();
    } catch (error) {
        console.log(error);
    }
};
sync();
