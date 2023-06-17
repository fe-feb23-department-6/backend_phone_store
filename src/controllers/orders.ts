'use strict';
import { Request as Req, Response as Res } from 'express';
import { sequelize } from '../server';
import { Orders } from '../models/Orders';
import { OrderDetails } from '../models/OrderDetails';
import { Op, WhereOptions } from 'sequelize';
import { productsService } from '../services/products';

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

const getOrders = async(req: Req, res: Res) => {
  const { userId, from, to } = req.query;

  try {
    const whereConditions: WhereOptions = {};

    if (userId) {
      whereConditions.user_id = userId;
    }

    if (from && to) {
      whereConditions.createdAt = { [Op.between]: [from, to] };
    } else if (from) {
      whereConditions.createdAt = { [Op.gte]: from };
    } else if (to) {
      whereConditions.createdAt = { [Op.lte]: to };
    }

    const listOfOrders = await Orders.findAll({
      where: whereConditions,
    });

    res.send(listOfOrders);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOneOrder = async(req: Req, res: Res) => {
  const { orderId } = req.params;
  const transaction = await sequelize?.transaction();

  try {
    const orders = await OrderDetails.findAll({
      where: {
        order_id: orderId,
      },
      transaction,
    });

    const ordersWithProductInfo = await Promise.all(
      orders.map(async(order) => {
        const productInfo = await productsService.getOneProductById(
          order.products_id,
        );

        return {
          order_id: order.order_id,
          products_id: order.products_id,
          quantity: order.quantity,
          productInfo,
        };
      }),
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
    await OrderDetails.destroy({
      where: {
        order_id: orderId,
      },
      transaction,
    });

    await Orders.destroy({
      where: {
        id: orderId,
      },
      transaction,
    });

    await transaction?.commit();

    res.sendStatus(204);
  } catch (error) {
    await transaction?.rollback();
    res.sendStatus(500);
  }
};

export const ordersController = {
  createOrder,
  getOrders,
  getOneOrder,
  deleteOrder,
};
