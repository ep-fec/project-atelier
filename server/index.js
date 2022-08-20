require ('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;
const axios = require('axios');
const token = process.env.TOKEN;

const request = require('./helpers/request.js');
// TODO: request functions for post and put may need to be adjusted
// Don't put the first / in the endpoint for requests

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.text());

app.get('/initialProduct', (request, response, next) => {
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products?page=3&count=1';

  axios.get(url, {
    headers: {
      'Authorization': token
    }
  })
  .then(result => {
    response.send(result.data[0]);
    next();
  })
  .catch((err) => {
    console.log('Error', err);
  });
});

app.post('/allStyles', (request, response, next) => {
  console.log('iddd', request.body);
  let endpoint = `products/${request.body}/styles`;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${endpoint}`;

  axios.get(url, {
    headers: {
      'Authorization': token
    },
  })
  .then(result => {
    //console.log('resultttt', result.data.results);
    response.send(result.data.results);
    next();
  })
  .catch((err) => {
    console.log('Error', err);
  });

});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});