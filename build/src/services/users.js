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
const _Orders = require("../models/Orders");
const _products = require("./products");
const _OrderDetails = require("../models/OrderDetails");
const findUser = async (userId)=>{
    return _Users.Users.findByPk(userId);
};
const createUser = async (name, email, password)=>{
    return _Users.Users.create({
        name,
        email,
        password
    });
};
const removeUser = async (userId)=>{
    return _Users.Users.destroy({
        where: {
            id: userId
        }
    });
};
const updateUser = async ({ id , name , password  })=>{
    return _Users.Users.update({
        name,
        password
    }, {
        where: {
            id
        }
    });
};
const getOneOrderByUser = async (userId, orderId, transaction)=>{
    const orderByUser = await _Orders.Orders.findOne({
        where: {
            id: orderId,
            user_id: userId
        },
        transaction
    });
    return orderByUser;
};
const getOrderDetails = async (orderId, transaction)=>{
    const orderDetails = await _OrderDetails.OrderDetails.findAll({
        where: {
            order_id: orderId
        },
        transaction
    });
    const ordersWithProductInfo = await Promise.all(orderDetails.map(async (order)=>{
        const productInfo = await _products.productsService.getOneProductById(order.products_id);
        return {
            order_id: order.order_id,
            products_id: order.products_id,
            quantity: order.quantity,
            productInfo
        };
    }));
    return ordersWithProductInfo;
};
const usersService = {
    findUser,
    createUser,
    removeUser,
    updateUser,
    getOneOrderByUser,
    getOrderDetails
};
