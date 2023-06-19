'use strict';

import express from 'express';
import { usersController } from '../controllers/users';

export const router = express.Router();

router.post('/', usersController.createUser);
router.get('/:userId', usersController.getUser);
router.get('/:userId/orders/:orderId', usersController.getOneOrderByUser);
router.delete('/:userId', usersController.deleteUser);
router.patch('/:userId', usersController.updateUser);