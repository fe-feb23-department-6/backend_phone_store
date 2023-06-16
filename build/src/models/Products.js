"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Products", {
    enumerable: true,
    get: function() {
        return Products;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _Phones = require("./Phones");
const _OrderDetails = require("./OrderDetails");
const _Cart = require("./Cart");
const _Favorites = require("./Favorites");
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
let Products = class Products extends _sequelizetypescript.Model {
    constructor(...args){
        super(...args);
        _define_property(this, "id", void 0);
        _define_property(this, "order_details", void 0);
        _define_property(this, "cart", void 0);
        _define_property(this, "favorite", void 0);
        _define_property(this, "category", void 0);
        _define_property(this, "phoneId", void 0);
        _define_property(this, "phone", void 0);
        _define_property(this, "itemId", void 0);
        _define_property(this, "name", void 0);
        _define_property(this, "fullPrice", void 0);
        _define_property(this, "price", void 0);
        _define_property(this, "screen", void 0);
        _define_property(this, "capacity", void 0);
        _define_property(this, "color", void 0);
        _define_property(this, "ram", void 0);
        _define_property(this, "year", void 0);
        _define_property(this, "image", void 0);
    }
};
_ts_decorate([
    _sequelizetypescript.PrimaryKey,
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Products.prototype, "id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.HasMany)(()=>_OrderDetails.OrderDetails)
], Products.prototype, "order_details", void 0);
_ts_decorate([
    (0, _sequelizetypescript.HasMany)(()=>_Cart.Cart)
], Products.prototype, "cart", void 0);
_ts_decorate([
    (0, _sequelizetypescript.HasMany)(()=>_Favorites.Favorites)
], Products.prototype, "favorite", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Products.prototype, "category", void 0);
_ts_decorate([
    (0, _sequelizetypescript.ForeignKey)(()=>_Phones.Phones),
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        field: 'phone_id',
        type: _sequelizetypescript.DataType.STRING
    })
], Products.prototype, "phoneId", void 0);
_ts_decorate([
    (0, _sequelizetypescript.BelongsTo)(()=>_Phones.Phones)
], Products.prototype, "phone", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        field: 'item_id',
        type: _sequelizetypescript.DataType.STRING
    })
], Products.prototype, "itemId", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Products.prototype, "name", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        field: 'full_price',
        type: _sequelizetypescript.DataType.INTEGER
    })
], Products.prototype, "fullPrice", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.INTEGER
    })
], Products.prototype, "price", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Products.prototype, "screen", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Products.prototype, "capacity", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Products.prototype, "color", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Products.prototype, "ram", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.INTEGER
    })
], Products.prototype, "year", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Products.prototype, "image", void 0);
Products = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'products',
        createdAt: false,
        updatedAt: false
    })
], Products);
