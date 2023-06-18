'use strict';
import { Request as Req, Response as Res } from 'express';
import { usersService } from '../services/users';
import { sequelize } from '../server';

const getUser = async(req: Req, res: Res) => {
  const { userId } = req.params;
  const userIdNumber = Number(userId);

  try {
    const foundUser = await usersService.findUser(userIdNumber);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createUser = async(req: Req, res: Res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.sendStatus(400);

    return;
  }

  try {
    const newUser = await usersService.createUser(name, email);

    res.statusCode = 201;

    res.send(newUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteUser = async(req: Req, res: Res) => {
  const { userId } = req.params;
  const userIdNumber = Number(userId);

  try {
    const foundUser = await usersService.findUser(userIdNumber);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    await usersService.removeUser(userIdNumber);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateUser = async(req: Req, res: Res) => {
  const { userId } = req.params;
  const userIdNumber = Number(userId);

  try {
    const foundUser = await usersService.findUser(userIdNumber);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    await usersService.updateUser({ id: userIdNumber, name });

    const updatedUser = await usersService.findUser(userIdNumber);

    res.send(updatedUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOneOrderByUser = async(req: Req, res: Res) => {
  const { userId, orderId } = req.params;
  const transaction = await sequelize?.transaction();

  try {
    const orderByUser = await usersService.getOneOrderByUser(
      userId,
      orderId,
      transaction,
    );

    if (!orderByUser) {
      res.sendStatus(404);

      return;
    }

    const ordersWithProductInfo = await usersService.getOrderDetails(
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

export const usersController = {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getOneOrderByUser,
};
