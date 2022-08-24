require('dotenv').config();
const axios = require('axios');
const headers = {
  Authorization: process.env.KEY
};

let request = (endpoint, method, data) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${endpoint}`
  return axios({url, method, data, headers})
    .then((result) => result)
    .catch((err) => err);
}

module.exports = request;