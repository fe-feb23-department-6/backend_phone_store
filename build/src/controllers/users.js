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
const _authentication = require("./authentication");
const _bcrypt = /*#__PURE__*/ _interop_require_default(require("bcrypt"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getAllActive = async (req, res)=>{
    try {
        const users = await _users.usersService.getAllActive();
        res.send(users.map(_users.usersService.normalize));
    } catch (error) {
        res.sendStatus(500);
    }
};
const getUserById = async (req, res)=>{
    const { userId  } = req.params;
    const userIdNumber = Number(userId);
    try {
        const foundUser = await _users.usersService.findUserById(userIdNumber);
        if (!foundUser) {
            res.sendStatus(404);
            return;
        }
        const { id , email , name  } = foundUser.dataValues;
        const normalizedUser = await _users.usersService.normalize({
            id,
            email,
            name
        });
        res.send(normalizedUser);
    } catch (error) {
        res.sendStatus(500);
    }
};
const deleteUser = async (req, res)=>{
    const { userId  } = req.params;
    const userIdNumber = Number(userId);
    try {
        const foundUser = await _users.usersService.findUserById(userIdNumber);
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
        const foundUser = await _users.usersService.findUserById(userIdNumber);
        if (!foundUser) {
            res.sendStatus(404);
            return;
        }
        const { name , password  } = req.body;
        const errors = {
            password: _authentication.authController.validatePassword(password)
        };
        if (errors.password) {
            return res.status(400).send('Validation error');
        }
        if (!name && !password) {
            res.sendStatus(400);
            return;
        }
        const hash = await _bcrypt.default.hash(password, 10);
        await _users.usersService.updateUser({
            id: userIdNumber,
            name,
            hash
        });
        const updatedUser = await _users.usersService.findUserById(userIdNumber);
        const normalizedUser = await _users.usersService.normalize(updatedUser?.dataValues);
        if (updatedUser) {
            delete updatedUser.dataValues.password;
        }
        res.send(normalizedUser);
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
    getUserById,
    deleteUser,
    updateUser,
    getOneOrderByUser,
    getAllActive
};
