'use strict';

import express from 'express';
import { usersController } from '../controllers/users';
import { authMiddleware } from '../middlewares/authMiddleware';

export const router = express.Router();

router.get('/', authMiddleware, usersController.getAllActive);
router.get('/:userId', usersController.getUserById);
router.get('/:userId/orders/:orderId', usersController.getOneOrderByUser);
router.delete('/:userId', usersController.deleteUser);
router.patch('/:userId', usersController.updateUser);
