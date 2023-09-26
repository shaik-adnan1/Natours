const express = require('express');
const fs = require('fs');

const app = express();

// Middleware -> a function that can modify the incoming request data
app.use(express.json());

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

// GET request
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

// POST request
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  // taking id from previous object from the tours array
  const newId = tours[tours.length - 1].id + 1;
  // creating new Object with id and requested tour data from req.data
  const newTour = Object.assign({ id: newId }, req.body);
  // Pushing the new tour to tours 
  tours.push(newTour);
  // writing the tours file with all new tours 
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    })
  })

});

const port = 3000;
// 1. creating a route on certain port
// => (app.listen) <= runs a callback function on port specified.

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
