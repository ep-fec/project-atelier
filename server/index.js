require ('dotenv').config();
const express = require ('express');
const path = require('path');
const app =  express();
const port = process.env.PORT;
const request = require('./helpers/request.js');

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.text());

app.get('/products', (req, res) => {
  request.get('products', (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});