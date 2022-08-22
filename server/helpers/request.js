require('dotenv').config();
const axios = require('axios');
const headers = {
  Authorization: process.env.KEY
};

let get = function(endpoint) {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${endpoint}`
  return axios.get(url, {headers})
    .then((result) => result)
    .catch((err) => err);
};

let post = function(endpoint, data) {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${endpoint}`
  return axios.post(url, {headers, data})
    .then((result) => result)
    .catch((err) => err);
};

let put = function(endpoint, data, cb) {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${endpoint}`
  return axios.put(url, {headers, data})
    .then((result) => result)
    .catch((err) => err);
};

module.exports = {get, post, put};