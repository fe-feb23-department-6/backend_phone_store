'use strict';
import { Request as Req, Response as Res } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authService } from '../services/authentication';
import { emailService } from '../services/emailService';
import { Users } from '../models/Users';
import { usersService } from '../services/users';
import { jwtService } from '../services/jwtService';

const login = async(req: Req, res: Res) => {
  const { email, password } = req.body;

  const user = await usersService.getUserByEmail(email);

  if (!user || password !== user?.password) {
    res.sendStatus(401);

    return;
  }

  const userData = usersService.normalize(user);

  const accessToken = jwtService.generateAccessToken(userData);

  res.send({
    user: userData,
    accessToken,
  });
};

const register = async(req: Req, res: Res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.sendStatus(400);

    return;
  }

  try {
    const activationToken = uuidv4();
    const newUser = await authService.createUser(
      name,
      email,
      password,
      activationToken,
    );

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

const activate = async(req: Req, res: Res) => {
  const { activationToken } = req.params;

  const user = await Users.findOne({
    where: { activationToken },
  });

  if (!user) {
    res.sendStatus(404);

    return;
  }

  user.activationToken = null;
  await user?.save();

  res.send(user);
};

export const authController = {
  register,
  activate,
  login,
};
