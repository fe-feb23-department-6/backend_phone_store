'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authService", {
    enumerable: true,
    get: function() {
        return authService;
    }
});
const _Users = require("../models/Users");
const createUser = async (name, email, password, activationToken)=>{
    return _Users.Users.create({
        name,
        email,
        password,
        activationToken
    });
};
const authService = {
    createUser
};
