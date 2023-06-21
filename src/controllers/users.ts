'use strict';
import { Request as Req, Response as Res } from 'express';
import { usersService } from '../services/users';
import { sequelize } from '../server';
import { authController } from './authentication';
import bcrypt from 'bcrypt';

const getAllActive = async(req: Req, res: Res) => {
  try {
    const users = await usersService.getAllActive();

    res.send(
      users.map(usersService.normalize),
    );
  } catch (error) {
    res.sendStatus(500);
  }
};

const getUserById = async(req: Req, res: Res) => {
  const { userId } = req.params;
  const userIdNumber = Number(userId);

  try {
    const foundUser = await usersService.findUserById(userIdNumber);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { id, email, name } = foundUser.dataValues;

    const normalizedUser = await usersService.normalize({ id, email, name });

    res.send(normalizedUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteUser = async(req: Req, res: Res) => {
  const { userId } = req.params;
  const userIdNumber = Number(userId);

  try {
    const foundUser = await usersService.findUserById(userIdNumber);

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
    const foundUser = await usersService.findUserById(userIdNumber);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name, password } = req.body;

    const errors = {
      password: authController.validatePassword(password),
    };

    if (errors.password) {
      return res.status(400).send('Validation error');
    }

    if (!name && !password) {
      res.sendStatus(400);

      return;
    }

    const hash = await bcrypt.hash(password, 10);

    await usersService.updateUser({ id: userIdNumber, name, hash });

    const updatedUser = await usersService.findUserById(userIdNumber);

    const normalizedUser = await usersService.normalize(
      updatedUser?.dataValues,
    );

    if (updatedUser) {
      delete updatedUser.dataValues.password;
    }

    res.send(normalizedUser);
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
  getUserById,
  deleteUser,
  updateUser,
  getOneOrderByUser,
  getAllActive,
};
