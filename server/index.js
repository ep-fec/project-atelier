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

  //console.log('request.data', request.body);

  axios.get(url, {
    headers: {
      'Authorization': token
    }
  })
  .then(result => {
    //console.log('Result', result.data);
    //response.setHeader('Content-Type', 'application/json');
    response.send(result.data[0]);
    next();
  })
  .catch((err) => {
    console.log('Error', err);
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});