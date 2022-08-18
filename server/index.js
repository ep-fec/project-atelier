require ('dotenv').config();
const axios = require('axios');
const path = require('path');
const port = process.env.PORT;
const token = process.env.TOKEN;
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.text());
app.use(bodyParser.text());

app.get('/initialProduct', (request, response, next) => {
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products?page=1&count=1';

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