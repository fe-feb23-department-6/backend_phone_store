/* eslint-disable no-console */ "use strict";
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
    console.log('TEST SAVE ID', userId);
    console.log('TEST SAVE TOKEN', refreshToken);
    const token = await _Token.Token.findOne({
        where: {
            userId
        }
    });
    console.log('TOKEN BEFORE', token);
    if (token) {
        token.refreshToken = refreshToken;
        await token.save();
        return;
    }
    console.log('TOKEN AFTER', token);
    const test = await _Token.Token.create({
        userId,
        refreshToken
    });
    console.log('TOKEN CREATE', test);
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
