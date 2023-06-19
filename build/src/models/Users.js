"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Users", {
    enumerable: true,
    get: function() {
        return Users;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _Orders = require("./Orders");
const _Favorites = require("./Favorites");
const _Cart = require("./Cart");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let Users = class Users extends _sequelizetypescript.Model {
    constructor(...args){
        super(...args);
        _define_property(this, "id", void 0);
        _define_property(this, "order", void 0);
        _define_property(this, "favorite", void 0);
        _define_property(this, "cart", void 0);
        _define_property(this, "name", void 0);
        _define_property(this, "email", void 0);
        _define_property(this, "password", void 0);
    }
};
_ts_decorate([
    _sequelizetypescript.PrimaryKey,
    _sequelizetypescript.AutoIncrement,
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.INTEGER
    })
], Users.prototype, "id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.HasMany)(()=>_Orders.Orders)
], Users.prototype, "order", void 0);
_ts_decorate([
    (0, _sequelizetypescript.HasMany)(()=>_Favorites.Favorites)
], Users.prototype, "favorite", void 0);
_ts_decorate([
    (0, _sequelizetypescript.HasMany)(()=>_Cart.Cart)
], Users.prototype, "cart", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Users.prototype, "name", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Users.prototype, "email", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Users.prototype, "password", void 0);
Users = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'users',
        createdAt: true,
        updatedAt: false
    })
], Users);
