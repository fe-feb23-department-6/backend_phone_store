'use strict';
import { Request as Req, Response as Res } from 'express';
import { sequelize } from '../server';
import { Orders } from '../models/Orders';
import { OrderDetails } from '../models/OrderDetails';
// import { usersService } from '../services/users';

interface Product {
  productId: string;
  quantity: number;
}

const createOrder = async(req: Req, res: Res) => {
  const { userId, products } = req.body;
  const transaction = await sequelize?.transaction();

  try {
    const order = await Orders.create({ user_id: userId }, { transaction });

    const orderDetails = products.map((product: Product) => ({
      order_id: order.id,
      products_id: product.productId,
      quantity: product.quantity,
    }));

    await OrderDetails.bulkCreate(orderDetails, { transaction });

    await transaction?.commit();

    const createdOrder = {
      id: order.id,
      user_id: order.user_id,
      products: orderDetails,
    };

    res.json(createdOrder);
  } catch (error) {
    await transaction?.rollback();
    res.sendStatus(500);
  }
};

const getOrders = async(req: Req, res: Res) => {};
const getOneOrder = async(req: Req, res: Res) => {};
const deleteOrder = async(req: Req, res: Res) => {};
const updateOrder = async(req: Req, res: Res) => {};

export const ordersController = {
  createOrder,
  getOrders,
  getOneOrder,
  deleteOrder,
  updateOrder,
};
