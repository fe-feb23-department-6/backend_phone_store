'use strict';
import { Request as Req, Response as Res } from 'express';

import { productsService } from '../services/products';

const getProducts = async(req: Req, res: Res) => {
  const products = await productsService.getAll();

  res.send(products);
};

export const productsController = {
  getProducts,
};
