/* eslint-disable no-console */
'use strict';

import { Transaction } from 'sequelize';
import { Users } from '../models/Users';
import { UserUpdateParams } from '../types/UserUpdateParams';
import { Orders } from '../models/Orders';
import { productsService } from './products';
import { OrderDetails } from '../models/OrderDetails';

const getAllActive = async() => {
  return Users.findAll({
    where: { activationToken: null },
    order: ['id'],
  });
};

const getUserByEmail = (email: string) => {
  return Users.findOne({
    where: { email },
  });
};

interface Normalize {
  id: number,
  email: string,
  name: string,
}

const normalize = ({ id, email, name }: Normalize) => {
  return { id, email, name };
};

const findUserById = async(userId: number): Promise<Users | null> => {
  return Users.findByPk(userId);
};

const removeUser = async(userId: number): Promise<number> => {
  return Users.destroy({
    where: { id: userId },
  });
};

const updateUser = async({ id, name, password }: UserUpdateParams) => {
  return Users.update({ name, password }, {
    where: { id },
  });
};

const getOneOrderByUser = async(
  userId: string,
  orderId: string,
  transaction: Transaction | undefined,
) => {
  console.log('ORDER-BY-SERVICE userId', userId);
  console.log('ORDER-BY-SERVICE orderId', orderId);

  const orderByUser = await Orders.findOne({
    where: {
      id: orderId,
      user_id: userId,
    },
    transaction,
  });

  console.log('ORDER-BY-SERVICE orderByUser', orderByUser);

  return orderByUser;
};

const getOrderDetails = async(
  orderId: string,
  transaction: Transaction | undefined,
) => {
  const orderDetails = await OrderDetails.findAll({
    where: {
      order_id: orderId,
    },
    transaction,
  });

  const ordersWithProductInfo = await Promise.all(
    orderDetails.map(async(order) => {
      const productInfo = await productsService.getOneProductById(
        order.dataValues.products_id,
      );

      return {
        order_id: order.dataValues.order_id,
        products_id: order.dataValues.products_id,
        quantity: order.dataValues.quantity,
        productInfo,
      };
    }),
  );

  console.log('ORDER-BY-DETAILS ordersWithProductInfo', ordersWithProductInfo);

  return ordersWithProductInfo;
};

export const usersService = {
  findUserById,
  removeUser,
  updateUser,
  getOneOrderByUser,
  getOrderDetails,
  getAllActive,
  normalize,
  getUserByEmail,
};
