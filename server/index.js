require ('dotenv').config();
const express = require ('express');
var expressStaticGzip = require("express-static-gzip");
const path = require('path');
const app = express();
const port = process.env.PORT;
const axios = require('axios');
const key = process.env.KEY;

const request = require('./helpers/request.js');

app.use('/', expressStaticGzip(path.resolve(__dirname, '../client/dist')));
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
      let [totalAmount, totalRatings] = [0, 0];
      for (let [key, value] of Object.entries(reviews)) {
        let [rating, amount] = [parseInt(key), parseInt(value)];
        totalAmount += (rating * amount);
        totalRatings += amount;
      }
      var reviewScore;
      if (totalRatings === 0) {
        reviewScore = "No Reviews";
      } else {
        reviewScore = Math.floor(totalAmount/totalRatings) || 0;
      }
      res.send({product, styles, reviewScore});
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

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});