'use strict';
import { Request as Req, Response as Res } from 'express';
import { customListService } from '../services/customList';

const getProductsByIds = async(req: Req, res: Res) => {
  const phoneIds = typeof req.query.phoneIds === 'string'
    ? req.query.phoneIds.split(',')
    : [];

  if (phoneIds.length === 0) {
    res.sendStatus(400);

    return;
  }

  try {
    const products = await customListService.getProductsByIds(phoneIds);

    if (products.length === 0) {
      res.sendStatus(404);

      return;
    }

    res.json({ products });
  } catch (error) {
    res.sendStatus(500);
  }
};

export const customListController = {
  getProductsByIds,
};
