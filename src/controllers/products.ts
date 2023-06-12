'use strict';
import { Request as Req, Response as Res } from 'express';

import { Products } from '../models/Products';
import { getProductsWitUrl } from '../utils/getProductsWitUrl';
import { filterProducts } from '../utils/filterProdacts';

const getProducts = async(req: Req, res: Res) => {
  const { page = '1', limit = '16', sort = 'newest' } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const offset = (pageNumber - 1) * limitNumber;

  const filterOption = filterProducts(sort);

  try {
    const products = await Products.findAndCountAll({
      order: filterOption,
      offset: offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(products.count / limitNumber);

    const productsWithURL = getProductsWitUrl(products.rows);

    res.json({
      products: productsWithURL,
      currentPage: pageNumber,
      totalPages: totalPages,
    })
  } catch (error) {
    res.status(500);
  }
};

export const productsController = {
  getProducts,
};
