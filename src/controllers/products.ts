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

const getProductsById = async(req: Req, res: Res) => {
  const { namespaceId } = req.params;

  try {
    const products = await productsService.getProductsById(namespaceId);

    if (!products) {
      res.sendStatus(404);

      return;
    }

    res.send(products);
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
  getProductsById,
  getRecommended,
};
