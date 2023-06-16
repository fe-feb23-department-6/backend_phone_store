"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OrderDetails", {
    enumerable: true,
    get: function() {
        return OrderDetails;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _Orders = require("./Orders");
const _Phones = require("./Phones");
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
let OrderDetails = class OrderDetails extends _sequelizetypescript.Model {
    constructor(...args){
        super(...args);
        _define_property(this, "id", void 0);
        _define_property(this, "order_id", void 0);
        _define_property(this, "order", void 0);
        _define_property(this, "phone_id", void 0);
        _define_property(this, "phone", void 0);
        _define_property(this, "quantity", void 0);
    }
};
_ts_decorate([
    _sequelizetypescript.PrimaryKey,
    _sequelizetypescript.AutoIncrement,
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.INTEGER
    })
], OrderDetails.prototype, "id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.ForeignKey)(()=>_Orders.Orders),
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.INTEGER
    })
], OrderDetails.prototype, "order_id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.BelongsTo)(()=>_Orders.Orders)
], OrderDetails.prototype, "order", void 0);
_ts_decorate([
    (0, _sequelizetypescript.ForeignKey)(()=>_Phones.Phones),
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING
    })
], OrderDetails.prototype, "phone_id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.BelongsTo)(()=>_Phones.Phones)
], OrderDetails.prototype, "phone", void 0);
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.INTEGER
    })
], OrderDetails.prototype, "quantity", void 0);
OrderDetails = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'order_details',
        createdAt: false,
        updatedAt: false
    })
], OrderDetails);
