'use strict';

import express from 'express';
import { productsController } from '../controllers/products';

export const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/new', productsController.getNewestProducts);
