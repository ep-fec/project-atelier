require ('dotenv').config();
const express = require ('express');
const path = require('path');
const app =  express();
const port = process.env.PORT;
const request = require('./helpers/request.js');
// TODO: request functions for post and put may need to be adjusted
// Don't put the first / in the endpoint for requests

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.text());

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});