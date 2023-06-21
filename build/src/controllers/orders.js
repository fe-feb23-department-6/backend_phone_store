/* eslint-disable no-console */ 'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ordersController", {
    enumerable: true,
    get: function() {
        return ordersController;
    }
});
const _server = require("../server");
const _Orders = require("../models/Orders");
const _orders = require("../services/orders");
const createOrder = async (req, res)=>{
    const { userId , products  } = req.body;
    console.log('CREATE - userId', userId);
    console.log('CREATE - products', products);
    const transaction = await _server.sequelize?.transaction();
    console.log('CREATE - transaction', transaction);
    try {
        const order = await _orders.orderService.createOrder(userId, products, transaction);
        console.log('CREATE - order+main', order);
        await transaction?.commit();
        res.json(order);
    } catch (error) {
        await transaction?.rollback();
        res.sendStatus(500);
    }
};
const getOrders = async (req, res)=>{
    const { userId , from , to  } = req.query;
    try {
        const orders = await _orders.orderService.getOrders(userId, from, to);
        res.send(orders);
    } catch (error) {
        res.sendStatus(500);
    }
};
const getOneOrder = async (req, res)=>{
    const { orderId  } = req.params;
    const transaction = await _server.sequelize?.transaction();
    try {
        const ordersWithProductInfo = await _orders.orderService.getOneOrder(orderId, transaction);
        await transaction?.commit();
        res.json(ordersWithProductInfo);
    } catch (error) {
        await transaction?.rollback();
        res.sendStatus(500);
    }
};
const deleteOrder = async (req, res)=>{
    const { orderId  } = req.params;
    const transaction = await _server.sequelize?.transaction();
    const foundOrder = await _Orders.Orders.findOne({
        where: {
            id: orderId
        }
    });
    if (!foundOrder) {
        res.sendStatus(404);
        return;
    }
    try {
        await _orders.orderService.deleteOrder(orderId, transaction);
        await transaction?.commit();
        res.sendStatus(204);
    } catch (error) {
        await transaction?.rollback();
        res.sendStatus(500);
    }
};
const updateOrder = async (req, res)=>{
    const { orderId , orderDetailsId  } = req.params;
    const { quantity , productId  } = req.body;
    try {
        const updatedOrderDetail = await _orders.orderService.updateOrderDetails(orderId, orderDetailsId, quantity, productId);
        res.json(updatedOrderDetail);
    } catch (error) {
        const message = error.message;
        if (message === 'Order detail not found') {
            res.sendStatus(404);
        } else if (message === 'Invalid quantity or productId') {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    }
};
const deleteProductFromOrder = async (req, res)=>{
    const { orderId , orderDetailsId  } = req.params;
    try {
        await _orders.orderService.deleteProductFromOrder(orderId, orderDetailsId);
        res.sendStatus(204);
    } catch (error) {
        const message = error.message;
        if (message === 'Order detail not found') {
            res.sendStatus(404);
        } else {
            res.sendStatus(500);
        }
    }
};
const addProductToOrder = async (req, res)=>{
    const { orderId  } = req.params;
    const { quantity , productId  } = req.body;
    try {
        const newOrderDetail = await _orders.orderService.addProductToOrder(orderId, quantity, productId);
        res.sendStatus(201);
        res.send(newOrderDetail);
    } catch (error) {
        const message = error.message;
        if (message === 'Order not found') {
            res.sendStatus(404);
        } else if (message === 'Invalid quantity or productId') {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    }
};
const ordersController = {
    createOrder,
    getOrders,
    getOneOrder,
    deleteOrder,
    updateOrder,
    deleteProductFromOrder,
    addProductToOrder
};
