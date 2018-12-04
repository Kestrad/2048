const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, '/../client/public')));

app.listen(1337, () => {
  console.log('listening on port 1337');
})