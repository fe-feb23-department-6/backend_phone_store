'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "usersController", {
    enumerable: true,
    get: function() {
        return usersController;
    }
});
const _users = require("../services/users");
const _server = require("../server");
const getUser = async (req, res)=>{
    const { userId  } = req.params;
    const userIdNumber = Number(userId);
    try {
        const foundUser = await _users.usersService.findUser(userIdNumber);
        if (!foundUser) {
            res.sendStatus(404);
            return;
        }
        res.send(foundUser);
    } catch (error) {
        res.sendStatus(500);
    }
};
const createUser = async (req, res)=>{
    const { name , email  } = req.body;
    if (!name || !email) {
        res.sendStatus(400);
        return;
    }
    try {
        const newUser = await _users.usersService.createUser(name, email);
        res.statusCode = 201;
        res.send(newUser);
    } catch (error) {
        res.sendStatus(500);
    }
};
const deleteUser = async (req, res)=>{
    const { userId  } = req.params;
    const userIdNumber = Number(userId);
    try {
        const foundUser = await _users.usersService.findUser(userIdNumber);
        if (!foundUser) {
            res.sendStatus(404);
            return;
        }
        await _users.usersService.removeUser(userIdNumber);
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
};
const updateUser = async (req, res)=>{
    const { userId  } = req.params;
    const userIdNumber = Number(userId);
    try {
        const foundUser = await _users.usersService.findUser(userIdNumber);
        if (!foundUser) {
            res.sendStatus(404);
            return;
        }
        const { name  } = req.body;
        if (!name) {
            res.sendStatus(400);
            return;
        }
        await _users.usersService.updateUser({
            id: userIdNumber,
            name
        });
        const updatedUser = await _users.usersService.findUser(userIdNumber);
        res.send(updatedUser);
    } catch (error) {
        res.sendStatus(500);
    }
};
const getOneOrderByUser = async (req, res)=>{
    const { userId , orderId  } = req.params;
    const transaction = await _server.sequelize?.transaction();
    try {
        const orderByUser = await _users.usersService.getOneOrderByUser(userId, orderId, transaction);
        if (!orderByUser) {
            res.sendStatus(404);
            return;
        }
        const ordersWithProductInfo = await _users.usersService.getOrderDetails(orderId, transaction);
        await transaction?.commit();
        res.json(ordersWithProductInfo);
    } catch (error) {
        await transaction?.rollback();
        res.sendStatus(500);
    }
};
const usersController = {
    createUser,
    getUser,
    deleteUser,
    updateUser,
    getOneOrderByUser
};
