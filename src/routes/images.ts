'use strict';

import express from 'express';
import { imagesController } from '../controllers/images';

export const router = express.Router();

router.get('/img/*', imagesController.getImage);