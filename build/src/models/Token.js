"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Token", {
    enumerable: true,
    get: function() {
        return Token;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _Users = require("./Users");
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
let Token = class Token extends _sequelizetypescript.Model {
    constructor(...args){
        super(...args);
        _define_property(this, "refreshToken", void 0);
        _define_property(this, "userId", void 0);
        _define_property(this, "user", void 0);
    }
};
_ts_decorate([
    (0, _sequelizetypescript.AllowNull)(false),
    (0, _sequelizetypescript.Column)({
        field: 'refresh_token',
        type: _sequelizetypescript.DataType.STRING
    })
], Token.prototype, "refreshToken", void 0);
_ts_decorate([
    (0, _sequelizetypescript.ForeignKey)(()=>_Users.Users),
    (0, _sequelizetypescript.Column)({
        field: 'user_id',
        type: _sequelizetypescript.DataType.INTEGER
    })
], Token.prototype, "userId", void 0);
_ts_decorate([
    (0, _sequelizetypescript.BelongsTo)(()=>_Users.Users)
], Token.prototype, "user", void 0);
Token = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'token',
        createdAt: true,
        updatedAt: true
    })
], Token);
