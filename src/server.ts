'use strict';

import express from 'express';
import { dbInit } from './utils/dbInit';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

dbInit();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is working on http://localhost:${PORT}`);
});
