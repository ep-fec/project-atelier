require('dotenv').config();
const axios = require('axios');

let get = function(endpoint, cb) {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${endpoint}`
  axios.get(url, {
    headers: {
     'Authorization': process.env.KEY
    }
  })
  .then((result) => {
    cb(null, result);
  })
  .catch((err) => {
    cb(err, null);
  });
};

let post = function(endpoint, data, cb) {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${endpoint}`
  axios.post(url, {
    headers: {
     'Authorization': process.env.KEY
    },
    data: data
  })
  .then((result) => {
    cb(null, result);
  })
  .catch((err) => {
    cb(err, null);
  });
};

let put = function(endpoint, data, cb) {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${endpoint}`
  axios.put(url, {
    headers: {
     'Authorization': process.env.KEY
    },
    data: data
  })
  .then((result) => {
    cb(null, result);
  })
  .catch((err) => {
    cb(err, null);
  });
};

module.exports = {get, post, put};