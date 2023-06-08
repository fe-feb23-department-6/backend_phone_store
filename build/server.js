'use strict';
import express from 'express';

const app = express();
const PORT = 5000;

app.get('/', function(req, res) {
  res.send('Hello world');
});

app.listen(PORT, function() {
  // eslint-disable-next-line no-console
  console.log('server is working on http://localhost:'.concat(PORT));
});
