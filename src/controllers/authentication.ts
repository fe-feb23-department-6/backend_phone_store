/* eslint-disable no-console */
'use strict';
import { Request as Req, Response as Res } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { authService } from '../services/authentication';
import { emailService } from '../services/emailService';
import { Users } from '../models/Users';
import { usersService } from '../services/users';
import { jwtService } from '../services/jwtService';
import { tokenService } from '../services/tokenService';

function validateEmail(value: string) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

const validatePassword = (value: string) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

const login = async(req: Req, res: Res) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.getUserByEmail(email);

    if (!user) {
      res.status(400).send('User with this email does not exist');

      return;
    }

    console.log('ЛОГИН - ЮЗЕР', user);
    console.log('ЛОГИН - ЮЗЕР ПАРОЛЬ', user.password);
    console.log('ЛОГИН - ЮЗЕР ПАРОЛЬ +++ dataValues', user.dataValues.password);

    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password,
    );

    if (!isPasswordValid) {
      res.status(400).send('Password is wrong');

      return;
    }

    await sendAuthentication(res, user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const refresh = async(req: Req, res: Res) => {
  const { refreshToken } = req.cookies;
  const userData = jwtService.validateRefreshToken(refreshToken);

  if (!userData || typeof userData === 'string') {
    res.sendStatus(401);

    return;
  }

  const token = await tokenService.getByToken(refreshToken);

  if (!token) {
    res.sendStatus(401);

    return;
  }

  console.log('РЕФРЕШ - refreshToken', refreshToken);
  console.log('РЕФРЕШ - token', token);
  console.log('РЕФРЕШ - userData', userData);
  console.log('РЕФРЕШ - userData.email', userData.email);
  console.log('РЕФРЕШ - userData.dataValues.email', userData.dataValues.email);

  const user = await usersService.getUserByEmail(userData.dataValues.email);

  if (!user) {
    res.sendStatus(401);

    return;
  }

  await sendAuthentication(res, user);
};

const sendAuthentication = async(res: Res, user: Users) => {
  const userData = usersService.normalize(user.dataValues);

  const accessToken = jwtService.generateAccessToken(userData);
  const refreshToken = jwtService.generateRefreshToken(userData);

  console.log('АКТИВАЦИЯ - ЕСТЬ ЛИ ЮЗЕР', user.id);
  console.log('АКТИВАЦИЯ - ЕСТЬ ЛИ ЮЗЕР +++ dataValues', user.dataValues.id);
  await tokenService.save(user.dataValues.id, refreshToken);

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.send({
    user: userData,
    accessToken,
  });
};

const register = async(req: Req, res: Res) => {
  const { name, email, password } = req.body;

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (errors.email || errors.password) {
    return res.status(400).send('Validation error');
  }

  if (!name || !email || !password) {
    res.sendStatus(400);

    return;
  }

  try {
    const existingUser = await usersService.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).send('Email is already taken');
    }

    const activationToken = uuidv4();
    const hash = await bcrypt.hash(password, 10);

    const newUser = await authService.createUser(
      name,
      email,
      hash,
      activationToken,
    );

    await emailService.sendActivationLink(email, activationToken);

    const userData = usersService.normalize(newUser.dataValues);

    res.statusCode = 201;

    res.send(userData);
  } catch (error) {
    res.sendStatus(500);
  }
};

const activate = async(req: Req, res: Res) => {
  try {
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

    await sendAuthentication(res, user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const logout = async(req: Req, res: Res) => {
  const { refreshToken } = req.cookies;
  const userData = jwtService.validateRefreshToken(refreshToken);

  res.clearCookie('refreshToken');

  console.log('ЛОГАУТ - userData', userData);

  if (userData && typeof userData !== 'string') {
    console.log('ЛОГАУТ - userData.id', userData.id);
    console.log('ЛОГАУТ - userData.dataValues.id', userData.dataValues.id);
    await tokenService.remove(userData.dataValues.id);
  }

  res.sendStatus(204);
};

export const authController = {
  register,
  activate,
  login,
  refresh,
  logout,
};
