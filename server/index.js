require ('dotenv').config();
const express = require ('express');
const path = require('path');
const app =  express();
const port = process.env.PORT;
const request = require('./helpers/request.js');

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());

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