/* eslint-disable no-console */ 'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "orderService", {
    enumerable: true,
    get: function() {
        return orderService;
    }
});
const _sequelize = require("sequelize");
const _OrderDetails = require("../models/OrderDetails");
const _Orders = require("../models/Orders");
const _products = require("./products");
const createOrder = async (userId, products, transaction)=>{
    console.log('CREATE - userId+createOrder', userId);
    console.log('CREATE - products+createOrder', products);
    const order = await _Orders.Orders.create({
        user_id: userId
    }, {
        transaction
    });
    console.log('CREATE - order', order);
    const orderDetails = products.map((product)=>({
            order_id: order.dataValues.id,
            products_id: product.productId,
            quantity: product.quantity
        }));
    console.log('CREATE - orderDetails', orderDetails);
    await _OrderDetails.OrderDetails.bulkCreate(orderDetails, {
        transaction
    });
    return {
        id: order.dataValues.id,
        user_id: order.dataValues.user_id,
        products: orderDetails
    };
};
const getOrders = async (userId, from, to)=>{
    const whereConditions = {};
    if (userId) {
        whereConditions.user_id = userId;
    }
    if (from && to) {
        whereConditions.createdAt = {
            [_sequelize.Op.between]: [
                from,
                to
            ]
        };
    } else if (from) {
        whereConditions.createdAt = {
            [_sequelize.Op.gte]: from
        };
    } else if (to) {
        whereConditions.createdAt = {
            [_sequelize.Op.lte]: to
        };
    }
    const listOfOrders = await _Orders.Orders.findAll({
        where: whereConditions
    });
    return listOfOrders;
};
const getOneOrder = async (orderId, transaction)=>{
    const orders = await _OrderDetails.OrderDetails.findAll({
        where: {
            order_id: orderId
        },
        transaction
    });
    const ordersWithProductInfo = await Promise.all(orders.map(async (order)=>{
        const productInfo = await _products.productsService.getOneProductById(order.products_id);
        return {
            id: order.id,
            order_id: order.order_id,
            products_id: order.products_id,
            quantity: order.quantity,
            productInfo
        };
    }));
    return ordersWithProductInfo;
};
const deleteOrder = async (orderId, transaction)=>{
    await _OrderDetails.OrderDetails.destroy({
        where: {
            order_id: orderId
        },
        transaction
    });
    await _Orders.Orders.destroy({
        where: {
            id: orderId
        },
        transaction
    });
};
const findOrderDetail = async (orderId, orderDetailsId)=>{
    const orderDetail = await _OrderDetails.OrderDetails.findOne({
        where: {
            id: orderDetailsId,
            order_id: orderId
        }
    });
    return orderDetail;
};
const updateOrderDetails = async (orderId, orderDetailsId, quantity, productId)=>{
    const orderDetail = await findOrderDetail(orderId, orderDetailsId);
    if (!orderDetail) {
        throw new Error('Order detail not found');
    }
    if (!quantity && !productId) {
        throw new Error('Invalid quantity or productId');
    }
    await _OrderDetails.OrderDetails.update({
        products_id: productId,
        quantity: quantity
    }, {
        where: {
            id: orderDetailsId,
            order_id: orderId
        }
    });
    const updatedOrderDetail = await findOrderDetail(orderId, orderDetailsId);
    return updatedOrderDetail;
};
const deleteProductFromOrder = async (orderId, orderDetailsId)=>{
    const orderDetail = await findOrderDetail(orderId, orderDetailsId);
    if (!orderDetail) {
        throw new Error('Order detail not found');
    }
    await _OrderDetails.OrderDetails.destroy({
        where: {
            id: orderDetailsId
        }
    });
};
const addProductToOrder = async (orderId, quantity, productId)=>{
    const foundOrder = await _Orders.Orders.findOne({
        where: {
            id: orderId
        }
    });
    if (!foundOrder) {
        throw new Error('Order not found');
    }
    if (!quantity || !productId) {
        throw new Error('Invalid quantity or productId');
    }
    const newOrderDetail = await _OrderDetails.OrderDetails.create({
        order_id: orderId,
        products_id: productId,
        quantity: quantity
    });
    return newOrderDetail;
};
const orderService = {
    createOrder,
    getOrders,
    getOneOrder,
    deleteOrder,
    updateOrderDetails,
    findOrderDetail,
    deleteProductFromOrder,
    addProductToOrder
};
