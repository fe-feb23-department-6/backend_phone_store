'use strict';

import { dbInit } from './utils/dbInit';
import cors from 'cors';
import path from 'path';
import { router as productsRouter } from './routes/products';
import { router as imagesRouter } from './routes/images';
import { Request as Req, Response as Res } from 'express';

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

dbInit();

app.use(cors());

app.get('/', (req: Req, res: Res) => {
  res.send("Hello world");
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(imagesRouter);

app.use('/products', express.json(), productsRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is working on http://localhost:${PORT}`);
});
