'use strict';

import { Transaction } from 'sequelize';
import { Users } from '../models/Users';
import { UserUpdateParams } from '../types/UserUpdateParams';
import { Orders } from '../models/Orders';
import { productsService } from './products';
import { OrderDetails } from '../models/OrderDetails';

const findUser = async(userId: number): Promise<Users | null> => {
  return Users.findByPk(userId);
};

const createUser = async(name: string, email: string): Promise<Users> => {
  return Users.create({
    name,
    email,
  });
};

const removeUser = async(userId: number): Promise<number> => {
  return Users.destroy({
    where: { id: userId },
  });
};

const updateUser = async({ id, name }: UserUpdateParams) => {
  return Users.update({ name }, {
    where: { id },
  });
};

const getOneOrderByUser = async(
  userId: string,
  orderId: string,
  transaction: Transaction | undefined,
) => {
  const orderByUser = await Orders.findOne({
    where: {
      id: orderId,
      user_id: userId,
    },
    transaction,
  });

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

  return ordersWithProductInfo;
};

export const usersService = {
  findUser,
  createUser,
  removeUser,
  updateUser,
  getOneOrderByUser,
  getOrderDetails,
};
