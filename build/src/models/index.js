"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "models", {
    enumerable: true,
    get: function() {
        return models;
    }
});
const _Cart = require("./Cart");
const _Favorites = require("./Favorites");
const _OrderDetails = require("./OrderDetails");
const _Orders = require("./Orders");
const _Phones = require("./Phones");
const _Products = require("./Products");
const _Token = require("./Token");
const _Users = require("./Users");
const models = [
    _Cart.Cart,
    _Favorites.Favorites,
    _OrderDetails.OrderDetails,
    _Orders.Orders,
    _Users.Users,
    _Products.Products,
    _Phones.Phones,
    _Token.Token
];
