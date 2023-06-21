/* eslint-disable no-console */
'use strict';
import { Request as Req, Response as Res } from 'express';
import { sequelize } from '../server';
import { Orders } from '../models/Orders';
import { orderService } from '../services/orders';

const createOrder = async(req: Req, res: Res) => {
  const { userId, products } = req.body;

  console.log('CREATE - userId', userId);
  console.log('CREATE - products', products);

  const transaction = await sequelize?.transaction();

  try {
    const order = await orderService.createOrder(userId, products, transaction);

    console.log('CREATE - order+main', order);

    await transaction?.commit();

    res.json(order);
  } catch (error) {
    await transaction?.rollback();
    res.sendStatus(500);
  }
};

const getOrders = async(req: Req, res: Res) => {
  const { userId, from, to } = req.query;

  try {
    const orders = await orderService.getOrders(userId, from, to);

    res.send(orders);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOneOrder = async(req: Req, res: Res) => {
  const { orderId } = req.params;
  const transaction = await sequelize?.transaction();

  try {
    const ordersWithProductInfo = await orderService.getOneOrder(
      orderId,
      transaction,
    );

    await transaction?.commit();

    res.json(ordersWithProductInfo);
  } catch (error) {
    await transaction?.rollback();
    res.sendStatus(500);
  }
};

const deleteOrder = async(req: Req, res: Res) => {
  const { orderId } = req.params;
  const transaction = await sequelize?.transaction();

  const foundOrder = await Orders.findOne({
    where: {
      id: orderId,
    },
  });

  if (!foundOrder) {
    res.sendStatus(404);

    return;
  }

  try {
    await orderService.deleteOrder(orderId, transaction);

    await transaction?.commit();

    res.sendStatus(204);
  } catch (error) {
    await transaction?.rollback();
    res.sendStatus(500);
  }
};

const updateOrder = async(req: Req, res: Res) => {
  const { orderId, orderDetailsId } = req.params;
  const { quantity, productId } = req.body;

  try {
    const updatedOrderDetail = await orderService.updateOrderDetails(
      orderId,
      orderDetailsId,
      quantity,
      productId,
    );

    res.json(updatedOrderDetail);
  } catch (error) {
    const message = (error as Error).message;

    if (message === 'Order detail not found') {
      res.sendStatus(404);
    } else if (message === 'Invalid quantity or productId') {
      res.sendStatus(400);
    } else {
      res.sendStatus(500);
    }
  }
};

const deleteProductFromOrder = async(req: Req, res: Res) => {
  const { orderId, orderDetailsId } = req.params;

  try {
    await orderService.deleteProductFromOrder(orderId, orderDetailsId);

    res.sendStatus(204);
  } catch (error) {
    const message = (error as Error).message;

    if (message === 'Order detail not found') {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  }
};

const addProductToOrder = async(req: Req, res: Res) => {
  const { orderId } = req.params;
  const { quantity, productId } = req.body;

  try {
    const newOrderDetail = await orderService.addProductToOrder(
      orderId,
      quantity,
      productId,
    );

    res.sendStatus(201);
    res.send(newOrderDetail);
  } catch (error) {
    const message = (error as Error).message;

    if (message === 'Order not found') {
      res.sendStatus(404);
    } else if (message === 'Invalid quantity or productId') {
      res.sendStatus(400);
    } else {
      res.sendStatus(500);
    }
  }
};

export const ordersController = {
  createOrder,
  getOrders,
  getOneOrder,
  deleteOrder,
  updateOrder,
  deleteProductFromOrder,
  addProductToOrder,
};
