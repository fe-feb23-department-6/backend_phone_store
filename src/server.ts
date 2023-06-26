/* eslint-disable no-console */
'use strict';

import { dbInit } from './utils/dbInit';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import { router as productsRouter } from './routes/products';
import { router as customListRouter } from './routes/customList';
import { router as imagesRouter } from './routes/images';
import { router as usersRouter } from './routes/users';
import { router as authRouter } from './routes/authentication';
import { router as ordersRouter } from './routes/orders';
import express from 'express';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './product_catalog.json';

const app = express();
const PORT = process.env.PORT || 3000;

export const sequelize = dbInit();

app.use(cors({
  origin: [
    'http://localhost:3000',
     process.env.CLIENT_URL!,
     'https://fe-feb23-department-6.github.io',
  ],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(imagesRouter);

app.use('/', express.json(), authRouter);

app.get('/', (req, res, next) => {
  if (req.url === '/') {
    return res.redirect('/docs');
  }
  next();
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/products', productsRouter);
app.use('/cart', customListRouter);
app.use('/favorites', customListRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.listen(PORT, () => {
  console.log(`server is working on http://localhost:${PORT}`);
});
