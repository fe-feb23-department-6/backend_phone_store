"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "tokenService", {
    enumerable: true,
    get: function() {
        return tokenService;
    }
});
const _Token = require("../models/Token");
const save = async (userId, refreshToken)=>{
    const token = await _Token.Token.findOne({
        where: {
            userId
        }
    });
    if (token) {
        token.refreshToken = refreshToken;
        await token.save();
        return;
    }
    await _Token.Token.create({
        userId,
        refreshToken
    });
};
const getByToken = async (refreshToken)=>{
    return _Token.Token.findOne({
        where: {
            refreshToken
        }
    });
};
const remove = async (userId)=>{
    return _Token.Token.destroy({
        where: {
            userId
        }
    });
};
const tokenService = {
    getByToken,
    save,
    remove
};
