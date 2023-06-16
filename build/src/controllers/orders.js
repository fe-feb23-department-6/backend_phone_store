'use strict';
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
const _OrderDetails = require("../models/OrderDetails");
const createOrder = async (req, res)=>{
    const { userId , products  } = req.body;
    const transaction = await _server.sequelize?.transaction();
    try {
        const order = await _Orders.Orders.create({
            user_id: userId
        }, {
            transaction
        });
        const orderDetails = products.map((product)=>({
                order_id: order.id,
                products_id: product.productId,
                quantity: product.quantity
            }));
        await _OrderDetails.OrderDetails.bulkCreate(orderDetails, {
            transaction
        });
        await transaction?.commit();
        const createdOrder = {
            id: order.id,
            user_id: order.user_id,
            products: orderDetails
        };
        res.json(createdOrder);
    } catch (error) {
        await transaction?.rollback();
        res.sendStatus(500);
    }
};
const getOrders = async (req, res)=>{};
const getOneOrder = async (req, res)=>{};
const deleteOrder = async (req, res)=>{};
const updateOrder = async (req, res)=>{};
const ordersController = {
    createOrder,
    getOrders,
    getOneOrder,
    deleteOrder,
    updateOrder
};
