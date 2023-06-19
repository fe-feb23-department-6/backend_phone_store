/* eslint-disable no-console */
'use strict';
import { Request as Req, Response as Res } from 'express';
import { productsService } from '../services/products';
import { getCategory } from '../utils/getCategory';

const getProducts = async(req: Req, res: Res) => {
  const {
    page = '1',
    limit = '16',
    sort = 'newest',
    query,
  } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const category = getCategory(req.path);

  try {
    const paginationData = await productsService.getProductsWithPagination(
      pageNumber,
      limitNumber,
      sort,
      query,
      category,
    );

    if (!paginationData.products) {
      res.sendStatus(404);

      return;
    }

    res.json(paginationData);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getNewestProducts = async(req: Req, res: Res) => {
  try {
    const newProducts = await productsService.getNewProducts();

    if (!newProducts) {
      res.sendStatus(404);

      return;
    }

    res.send(newProducts);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getHotPriceProducts = async(req: Req, res: Res) => {
  try {
    const hotPriceProducts = await productsService.getHotProducts();

    if (!hotPriceProducts) {
      res.sendStatus(404);

      return;
    }

    res.send(hotPriceProducts);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getNamespaceListByProductsId = async(req: Req, res: Res) => {
  const { phoneId } = req.params;

  try {
    const product = await productsService.getOnePhoneById(phoneId);

    console.log('TEST product ++++++!!!', product);

    if (!product) {
      res.sendStatus(404);

      return;
    }

    const products = await productsService.getNamespaceListByProductsId(
      product.dataValues.namespaceId,
    );

    res.send(products);
  } catch (error) {
    console.log('TEST', error);
    res.sendStatus(500);
  }
};

const getOneProductById = async(req: Req, res: Res) => {
  const { productId } = req.params;

  try {
    const product = await productsService.getOneProductById(productId);

    if (!product) {
      res.sendStatus(404);

      return;
    }

    res.send(product);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getRecommended = async(req: Req, res: Res) => {
  try {
    const recommendedProducts = await productsService.getRecommendedProducts();

    if (!recommendedProducts) {
      res.sendStatus(404);

      return;
    }

    res.send(recommendedProducts);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const productsController = {
  getProducts,
  getNewestProducts,
  getHotPriceProducts,
  getNamespaceListByProductsId,
  getRecommended,
  getOneProductById,
};
