'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "usersService", {
    enumerable: true,
    get: function() {
        return usersService;
    }
});
const _Users = require("../models/Users");
const findUser = async (userId)=>{
    return _Users.Users.findByPk(userId);
};
const createUser = async (name, email)=>{
    return _Users.Users.create({
        name,
        email
    });
};
const removeUser = async (userId)=>{
    return _Users.Users.destroy({
        where: {
            id: userId
        }
    });
};
const updateUser = async ({ id , name  })=>{
    return _Users.Users.update({
        name
    }, {
        where: {
            id
        }
    });
};
const usersService = {
    findUser,
    createUser,
    removeUser,
    updateUser
};
