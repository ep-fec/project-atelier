require ('dotenv').config();
const express = require ('express');
var expressStaticGzip = require("express-static-gzip");
const path = require('path');
const app = express();
const expressGzip = require('express-static-gzip');
const port = process.env.PORT;
const axios = require('axios');
const key = process.env.KEY;

const request = require('./helpers/request.js');
const uploadImage = require('./helpers/cloudinary.js');

app.use('/', expressStaticGzip(path.resolve(__dirname, '../client/dist')));
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json({limit:  '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}))

app.post('/reviews/uploads', async (req, res) => {
  if (req.body?.photos.length) {
    const images = req.body.photos;
    let uploaded = await images.map((image) => (
      uploadImage(image)
    ));

    Promise.all(uploaded)
      .then((imgs) => {
        req.body.photos = imgs
        return request('/reviews', 'POST', req.body)
      })
      .then((data) => res.send(data.data))
      .catch((err) => {
        console.log(err);
        res.status(404).end();
      });
  } else {
    request('/reviews', 'POST', req.body)
      .then((data) => res.send(data.data))
      .catch((err) => {
        console.log('There was an error!:', err);
        res.status(404).end();
      });
  }
});
app.use(express.text());

app.post('/allStyles', (request, response) => {
  let endpoint = `products/${request.body}/styles`;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${endpoint}`;

  return axios.get(url, {
    headers: {
      'Authorization': key
    },
  })
    .then(result => {
      response.send(result.data.results);
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
        reviewScore = 'No Reviews';
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