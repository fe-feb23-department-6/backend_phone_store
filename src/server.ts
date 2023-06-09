'use strict';

import { dbInit } from './utils/dbInit';
import cors from 'cors';
import { router as productsRouter } from './routes/products';

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

dbInit();

app.use(cors());

app.use('/products', express.json(), productsRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is working on http://localhost:${PORT}`);
});
