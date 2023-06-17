/* eslint-disable no-console */
'use strict';

import { dbInit } from './utils/dbInit';
import cors from 'cors';
import path from 'path';
import { router as productsRouter } from './routes/products';
import { router as customListRouter } from './routes/customList';
import { router as imagesRouter } from './routes/images';
import { router as usersRouter } from './routes/users';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './product_catalog.json';

const app = express();
const PORT = process.env.PORT || 3000;

export const sequelize = dbInit();

app.use(cors());

app.get('/', (req, res, next) => {
  if (req.url === '/') {
    return res.redirect('/docs');
  }
  next();
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(imagesRouter);

app.use('/products', express.json(), productsRouter);
app.use('/cart', express.json(), customListRouter);
app.use('/favorites', express.json(), customListRouter);
app.use('/users', express.json(), usersRouter);

app.listen(PORT, () => {
  console.log(`server is working on http://localhost:${PORT}`);
});
