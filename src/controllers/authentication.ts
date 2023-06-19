'use strict';
import { Request as Req, Response as Res } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authService } from '../services/authentication';
import { emailService } from '../services/emailService';

const register = async(req: Req, res: Res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.sendStatus(400);

    return;
  }

  try {
    const newUser = await authService.createUser(name, email, password);
    const activationToken = uuidv4();

    await emailService.sendActivationLink(email, activationToken);

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
