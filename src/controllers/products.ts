'use strict';
import { Request as Req, Response as Res } from 'express';
import { productsService } from '../services/products';

const getProducts = async(req: Req, res: Res) => {
  const { page = '1', limit = '16', sort = 'newest', query } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  try {
    const paginationData = await productsService.getProductsWithPagination(
      pageNumber,
      limitNumber,
      sort,
      query,
    );

    if (paginationData.products.length === 0) {
      res.sendStatus(404);

      return;
    }

    res.json(paginationData);
  } catch (error) {
    res.status(500);
  }
};

const getNewestProducts = async(req: Req, res: Res) => {
  try {
    const newProducts = await productsService.getNewProducts();

    res.send(newProducts);
  } catch (error) {
    res.status(500);
  }
};

const getHotPriceProducts = async(req: Req, res: Res) => {
  try {
    const hotPriceProducts = await productsService.getHotProducts();

    res.send(hotPriceProducts);
  } catch (error) {
    res.status(500);
  }
};

export const productsController = {
  getProducts,
  getNewestProducts,
  getHotPriceProducts,
};
