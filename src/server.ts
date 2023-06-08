'use strict';

import express from 'express';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send("Hello world")
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is working on http://localhost:${PORT}`);
});
