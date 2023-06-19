'use strict';
import { Request as Req, Response as Res } from 'express';
import { authService } from '../services/authentication';

const register = async(req: Req, res: Res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.sendStatus(400);

    return;
  }

  try {
    const newUser = await authService.createUser(name, email, password);

    if (newUser) {
      delete newUser.dataValues.password;
    }

    res.statusCode = 201;

    res.send(newUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const authController = {
  register,
};
