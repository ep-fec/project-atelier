require ('dotenv').config();
const express = require ('express');
const path = require('path');
const app =  express();
const port = process.env.PORT;
const request = require('./helpers/request.js');
// TODO: request functions for post and put may need to be adjusted
// Don't put the first / in the endpoint for requests

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.text());

app.get('/products', function(req, res) {
  request.get('products', (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.data);
    }
  });
});

app.get('/products/:productId', function(req, res) {
  let id = req.params.productId;
  request.get(`products/${id}`, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.data);
    }
  });
});

app.get('/related/:productId', function(req, res) {
  let id = req.params.productId;
  request.get(`products/${id}/related`, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.data);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});