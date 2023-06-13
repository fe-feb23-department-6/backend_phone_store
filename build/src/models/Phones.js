"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Phones", {
    enumerable: true,
    get: function() {
        return Phones;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _Products = require("./Products");
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
let Phones = class Phones extends _sequelizetypescript.Model {
    constructor(...args){
        super(...args);
        _define_property(this, "id", void 0);
        _define_property(this, "products", void 0);
        _define_property(this, "namespaceId", void 0);
        _define_property(this, "name", void 0);
        _define_property(this, "capacityAvailable", void 0);
        _define_property(this, "capacity", void 0);
        _define_property(this, "priceRegular", void 0);
        _define_property(this, "priceDiscount", void 0);
        _define_property(this, "colorsAvailable", void 0);
        _define_property(this, "color", void 0);
        _define_property(this, "images", void 0);
        _define_property(this, "description", void 0);
        _define_property(this, "screen", void 0);
        _define_property(this, "resolution", void 0);
        _define_property(this, "processor", void 0);
        _define_property(this, "ram", void 0);
        _define_property(this, "camera", void 0);
        _define_property(this, "zoom", void 0);
        _define_property(this, "cell", void 0);
    }
};
_ts_decorate([
    _sequelizetypescript.PrimaryKey,
    _sequelizetypescript.AutoIncrement,
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Phones.prototype, "id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.HasOne)(()=>_Products.Products)
], Phones.prototype, "products", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Phones.prototype, "namespaceId", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Phones.prototype, "name", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.ARRAY(_sequelizetypescript.DataType.STRING)
    })
], Phones.prototype, "capacityAvailable", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Phones.prototype, "capacity", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.INTEGER
    })
], Phones.prototype, "priceRegular", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.INTEGER
    })
], Phones.prototype, "priceDiscount", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.ARRAY(_sequelizetypescript.DataType.STRING)
    })
], Phones.prototype, "colorsAvailable", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Phones.prototype, "color", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.ARRAY(_sequelizetypescript.DataType.STRING)
    })
], Phones.prototype, "images", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.ARRAY(_sequelizetypescript.DataType.JSONB)
    })
], Phones.prototype, "description", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Phones.prototype, "screen", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Phones.prototype, "resolution", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Phones.prototype, "processor", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Phones.prototype, "ram", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Phones.prototype, "camera", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], Phones.prototype, "zoom", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.ARRAY(_sequelizetypescript.DataType.STRING)
    })
], Phones.prototype, "cell", void 0);
Phones = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'phones',
        createdAt: false,
        updatedAt: false
    })
], Phones);
