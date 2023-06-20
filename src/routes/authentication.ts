'use strict';

import express from 'express';
import { authController } from '../controllers/authentication';

export const router = express.Router();

router.post('/registration', authController.register);
router.get('/activation/:activationToken', authController.activate);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
