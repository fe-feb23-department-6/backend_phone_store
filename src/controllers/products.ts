/* eslint-disable no-console */
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

const getProductById = async(req: Req, res: Res) => {
  const { id } = req.params;

  try {
    const product = await productsService.getProductById(id);

    if (!product) {
      res.sendStatus(404);

      return;
    }

    res.send(product);
  } catch (error) {
    res.status(500);
  }
};

const getRecommendedProducts = async(req: Req, res: Res) => {
  try {
    const recommendedProducts = await productsService.getRecommendedProducts();

    res.send(recommendedProducts);
  } catch (error) {
    res.status(500);
  }
};

// const getAddedProducts = async(req: Req, res: Res) => {
//   const { productsIds } = req.body;

//   console.log('ПРОВЕРКА ID+++++', req.body);

//   try {
// eslint-disable-next-line max-len
//     const addedProducts = await productsService.getProductsByArrayID(productsIds);

//     res.send(addedProducts);
//   } catch (error) {
//     res.status(500);
//   }
// };

export const productsController = {
  getProducts,
  getNewestProducts,
  getHotPriceProducts,
  getProductById,
  getRecommendedProducts,
  // getAddedProducts,
};
