require ('dotenv').config();
const axios = require('axios');
const path = require('path');
const port = process.env.PORT;
const token = process.env.TOKEN;
//const bodyParser = require('body-parser');

const express = require ('express');
const app =  express();

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.text());
//app.use(bodyParser.json());

app.get('/allProducts', async(request, response, next) => {
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products?page=1&count=5';

  axios.get(url, {
    headers: {
      //'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then((response) => {
    console.log('Response', response.data);
  })
  .catch((err) => {
    console.log('Error', err);
  })
  response.send();
  next();
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});