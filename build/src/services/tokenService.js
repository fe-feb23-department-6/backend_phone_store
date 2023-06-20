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
    try {
        const token = await _Token.Token.findOne({
            where: {
                userId
            }
        });
        if (token) {
            await token.update({
                refreshToken
            });
            return;
        }
        await _Token.Token.create({
            userId,
            refreshToken
        });
    } catch (error) {
        throw new Error('Failed to save token');
    }
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
