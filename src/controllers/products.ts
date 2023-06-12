'use strict';
import { Request as Req, Response as Res } from 'express';
import { productsService } from '../services/products';

const getProducts = async(req: Req, res: Res) => {
  const { page = '1', limit = '16', sort = 'newest' } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  try {
    const paginationData = await productsService.getProductsWithPagination(
      pageNumber, 
      limitNumber, 
      sort
    );
    
    res.json(paginationData);
  } catch (error) {
    res.status(500);
  }
};

export const productsController = {
  getProducts,
};
