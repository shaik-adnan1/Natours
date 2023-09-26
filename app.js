const express = require('express');
const fs = require('fs');

const app = express();

// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Hello from the server side' , app: 'Natours'})
// })

// app.post('/', (req, res) => {
//     res.send('You can post to this url endpoint')
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get basically setups a GET request(method) in the api route

app.get('/api/v1/tours', (req, res) => {
  // this function is called route handler
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

const port = 3000;
// 1. creating a route on certain port
// => (app.listen) <= runs a callback function on port specified.

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
