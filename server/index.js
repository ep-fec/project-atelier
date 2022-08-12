require ('dotenv').config();
const express = require ('express');
const path = require('path');
const app =  express();
const port = process.env.PORT;

app.use(express.static(path.resolve(__dirname, '../client/dist')));

// app.get('/', (request, response) => {
//   response.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});