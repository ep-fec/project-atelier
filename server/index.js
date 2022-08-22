require ('dotenv').config();
const express = require ('express');
const path = require('path');
const app =  express();
const port = process.env.PORT;
const request = require('./helpers/request.js');

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());

// TODO: request functions for post and put may need to be adjusted
// Don't put the first / in the endpoint for requests

// SAMPLE GET
app.get('/*', (req, res) => {
  let endpoint = req.url;
  request.get(endpoint)
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