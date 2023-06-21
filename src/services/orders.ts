/* eslint-disable no-console */
'use strict';

import { Op, Transaction, WhereOptions } from 'sequelize';
import { OrderDetails } from '../models/OrderDetails';
import { Orders } from '../models/Orders';
import { SortType } from '../types/SortType';
import { productsService } from './products';

interface Product {
  productId: string;
  quantity: number;
}

const createOrder = async(
  userId: string,
  products: Product[],
  transaction: Transaction | undefined,
) => {
  const order = await Orders.create({ user_id: userId }, { transaction });

  const orderDetails = products.map((product: Product) => ({
    order_id: order.dataValues.id,
    products_id: product.productId,
    quantity: product.quantity,
  }));

  await OrderDetails.bulkCreate(orderDetails, { transaction });

  return {
    id: order.dataValues.id,
    user_id: order.dataValues.user_id,
    products: orderDetails,
  };
};

const getOrders = async(
  userId?: SortType,
  from?: SortType,
  to?: SortType,
) => {
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

  return listOfOrders;
};

const getOneOrder = async(
  orderId: string,
  transaction: Transaction | undefined,
) => {
  const orders = await OrderDetails.findAll({
    where: {
      order_id: orderId,
    },
    transaction,
  });

  console.log('GET-ONE-DETAILS orders', orders);

  const ordersWithProductInfo = await Promise.all(
    orders.map(async(order) => {
      console.log('GET-ONE-MAP order', order);

      const productInfo = await productsService.getOneProductById(
        order.dataValues.products_id,
      );

      return {
        id: order.id,
        order_id: order.order_id,
        products_id: order.products_id,
        quantity: order.quantity,
        productInfo,
      };
    }),
  );

  console.log('GET-ONE-DETAILS ordersWithProductInfo', ordersWithProductInfo);

  return ordersWithProductInfo;
};

const deleteOrder = async(
  orderId: string,
  transaction: Transaction | undefined,
) => {
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
};

const findOrderDetail = async(orderId: string, orderDetailsId: string) => {
  const orderDetail = await OrderDetails.findOne({
    where: {
      id: orderDetailsId,
      order_id: orderId,
    },
  });

  return orderDetail;
};

const updateOrderDetails = async(
  orderId: string,
  orderDetailsId: string,
  quantity: number,
  productId: string,
) => {
  const orderDetail = await findOrderDetail(orderId, orderDetailsId);

  if (!orderDetail) {
    throw new Error('Order detail not found');
  }

  if (!quantity && !productId) {
    throw new Error('Invalid quantity or productId');
  }

  await OrderDetails.update({
    products_id: productId,
    quantity: quantity,
  }, {
    where: {
      id: orderDetailsId,
      order_id: orderId,
    },
  });

  const updatedOrderDetail = await findOrderDetail(orderId, orderDetailsId);

  return updatedOrderDetail;
};

const deleteProductFromOrder = async(
  orderId: string,
  orderDetailsId: string,
) => {
  const orderDetail = await findOrderDetail(orderId, orderDetailsId);

  if (!orderDetail) {
    throw new Error('Order detail not found');
  }

  await OrderDetails.destroy({
    where: {
      id: orderDetailsId,
    },
  });
};

const addProductToOrder = async(
  orderId: string,
  quantity: number,
  productId: string,
) => {
  const foundOrder = await Orders.findOne({
    where: {
      id: orderId,
    },
  });

  if (!foundOrder) {
    throw new Error('Order not found');
  }

  if (!quantity || !productId) {
    throw new Error('Invalid quantity or productId');
  }

  const newOrderDetail = await OrderDetails.create({
    order_id: orderId,
    products_id: productId,
    quantity: quantity,
  });

  return newOrderDetail;
};

export const orderService = {
  createOrder,
  getOrders,
  getOneOrder,
  deleteOrder,
  updateOrderDetails,
  findOrderDetail,
  deleteProductFromOrder,
  addProductToOrder,
};
