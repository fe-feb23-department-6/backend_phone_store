"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Orders", {
    enumerable: true,
    get: function() {
        return Orders;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _Users = require("./Users");
const _OrderDetails = require("./OrderDetails");
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
let Orders = class Orders extends _sequelizetypescript.Model {
    constructor(...args){
        super(...args);
        _define_property(this, "id", void 0);
        _define_property(this, "order_detail", void 0);
        _define_property(this, "user_id", void 0);
        _define_property(this, "user", void 0);
    }
};
_ts_decorate([
    _sequelizetypescript.PrimaryKey,
    _sequelizetypescript.AutoIncrement,
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.INTEGER
    })
], Orders.prototype, "id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.HasMany)(()=>_OrderDetails.OrderDetails)
], Orders.prototype, "order_detail", void 0);
_ts_decorate([
    (0, _sequelizetypescript.ForeignKey)(()=>_Users.Users),
    (0, _sequelizetypescript.AllowNull)(true),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.INTEGER
    })
], Orders.prototype, "user_id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.BelongsTo)(()=>_Users.Users)
], Orders.prototype, "user", void 0);
Orders = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'orders',
        createdAt: true,
        updatedAt: false
    })
], Orders);
