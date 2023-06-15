'use strict';

import express from 'express';
import { customListController } from '../controllers/customList';

export const router = express.Router();

router.get('/', customListController.getProductsByIds);
