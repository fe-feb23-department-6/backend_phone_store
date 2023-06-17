'use strict';

import express from 'express';
import { ordersController } from '../controllers/orders';

export const router = express.Router();

router.post('/', ordersController.createOrder);
router.get('/', ordersController.getOrders);
router.get('/:orderId', ordersController.getOneOrder);
router.delete('/:orderId', ordersController.deleteOrder);
