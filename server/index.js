require ('dotenv').config();
const express = require ('express');
var expressStaticGzip = require("express-static-gzip");
const path = require('path');
const app =  express();
const port = process.env.PORT;
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

app.all('/*', (req, res) => {
  request(req.url, req.method, req.body)
    .then((data) => {
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