/* eslint-disable no-console */ 'use strict';
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
const getAllActive = async ()=>{
    return _Users.Users.findAll({
        where: {
            activationToken: null
        },
        order: [
            'id'
        ]
    });
};
const getUserByEmail = (email)=>{
    return _Users.Users.findOne({
        where: {
            email
        }
    });
};
const normalize = ({ id , email , name  })=>{
    return {
        id,
        email,
        name
    };
};
const findUserById = async (userId)=>{
    return _Users.Users.findByPk(userId);
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
    console.log('ORDER-BY-SERVICE userId', userId);
    console.log('ORDER-BY-SERVICE orderId', orderId);
    const orderByUser = await _Orders.Orders.findOne({
        where: {
            id: orderId,
            user_id: userId
        },
        transaction
    });
    console.log('ORDER-BY-SERVICE orderByUser', orderByUser);
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
        const productInfo = await _products.productsService.getOneProductById(order.dataValues.products_id);
        return {
            order_id: order.dataValues.order_id,
            products_id: order.dataValues.products_id,
            quantity: order.dataValues.quantity,
            productInfo
        };
    }));
    console.log('ORDER-BY-DETAILS ordersWithProductInfo', ordersWithProductInfo);
    return ordersWithProductInfo;
};
const usersService = {
    findUserById,
    removeUser,
    updateUser,
    getOneOrderByUser,
    getOrderDetails,
    getAllActive,
    normalize,
    getUserByEmail
};
