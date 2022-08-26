require ('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;
const axios = require('axios');
const key = process.env.KEY;

const request = require('./helpers/request.js');

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.text());

app.post('/allStyles', (request, response, next) => {
  let endpoint = `products/${request.body}/styles`;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${endpoint}`;

  axios.get(url, {
    headers: {
      'Authorization': key
    },
  })
  .then(result => {
    response.send(result.data.results);
    next();
  })
  .catch((err) => {
    console.log('Error', err);
  });

});

app.get('/related/:productId', function(req, res) {
  let id = req.params.productId;
  let [productURL, stylesURL, reviewsURL] = [`/products/${id}`,
  `/products/${id}/styles`, `/reviews/meta/?product_id=${id}`];
  var product, styles, reviews;
  request(productURL, req.method, req.body)
    .then((response) => {
      product = response.data;
    })
    .then(() => {
      return request(stylesURL, req.method, req.body);
    })
    .then((response) => {
      styles = response.data.results;
    })
    .then(() => {
      return request(reviewsURL, req.method, req.body);
    })
    .then((response) => {
      reviews = response.data.ratings;
      res.send({product, styles, reviews})
    })
    .catch((err) => {
      res.send(err);
    });
});

app.all('/*', (req, res) => {
  request(req.url, req.method, req.body)
    .then((response) => {
      // console.log('Success!:', response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('There was an error!:', err);
      res.status(404).end();
    });
});

// app.get('/products', function(req, res) {
//   request.get('products', (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result.data);
//     }
//   });
// });

// app.get('/products/:productId', function(req, res) {
//   let id = req.params.productId;
//   request.get(`products/${id}`, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result.data);
//     }
//   });
// });



app.listen(port, () => {
  console.log(`Listening on ${port}`);
});