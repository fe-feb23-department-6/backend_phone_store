'use strict';
import { Request as Req, Response as Res, NextFunction } from 'express';
import { jwtService } from '../services/jwtService';

export const authMiddleware = (req: Req, res: Res, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.sendStatus(401);

    return;
  }

  const [, accessToken] = authHeader.split(' ');

  if (!accessToken) {
    res.sendStatus(401);

    return;
  }

  const userData = jwtService.validateAccessToken(accessToken);

  if (!userData) {
    res.sendStatus(401);

    return;
  }

  next();
};
