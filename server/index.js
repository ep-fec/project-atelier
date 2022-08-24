require ('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;
const axios = require('axios');
const token = process.env.KEY;

const request = require('./helpers/request.js');

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

app.all('/*', (req, res) => {
  request(req.url, req.method, req.body)
    .then((data) => {
      console.log('Success!:', data.data);
      res.send(data.data);
    })
    .catch((err) => {
      console.log('There was an error!:', err);
      res.status(404).end();
    });
});

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

app.all('/*', (req, res) => {
  request(req.url, req.method, req.body)
    .then((data) => {
      // console.log('Success!:', data.data);
      res.send(data.data);
    })
    .catch((err) => {
      console.log('There was an error!:', err);
      res.status(404).end();
    });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});