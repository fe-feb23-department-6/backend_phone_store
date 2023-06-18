'use strict';

import express from 'express';
import { productsController } from '../controllers/products';

export const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getOneProductById);
router.get('/phones', productsController.getProducts);
router.get('/tablets', productsController.getProducts);
router.get('/accessories', productsController.getProducts);
router.get('/new', productsController.getNewestProducts);
router.get('/discount', productsController.getHotPriceProducts);
router.get('/:namespaceId', productsController.getProductsById);
router.get('/:namespaceId/recommended', productsController.getRecommended);
