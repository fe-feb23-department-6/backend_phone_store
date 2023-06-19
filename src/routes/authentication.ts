'use strict';

import express from 'express';
import { authController } from '../controllers/authentication';

export const router = express.Router();

router.post('/', authController.register);
