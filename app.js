const express = require('express');
const fs = require('fs');

const app = express();

// Middleware -> a function that can modify the incoming request data
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// these below functions ⬇️ are called route handler

// ----------- getAllTours -----------

const getAllTours = (req, res) => {
  // this function is called route handler
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

// ----------- getTourByID -----------

const getTourByID = (req, res) => {
  // My code

  const id = req.params.id;
  const reqTour = tours[id];

  // Alternative
  // const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id)

  // if (id > tours.length) {
  if (!reqTour) {
    res.status(400).json({ status: 'fail', message: 'invalid ID' });
  } else {
    // retrieving tour matching to id parameter

    // console.log()
    res.status(200).json({
      status: 'Success',
      // results: tours.length,
      data: {
        reqTour,
      },
    });
  }
};

// ----------- addNewTour -----------

const addNewTour = (req, res) => {
  // console.log(req.body);

  // taking id from previous object from the tours array
  const newId = tours[tours.length - 1].id + 1;
  // creating new Object with id and requested tour data from req.data
  const newTour = Object.assign({ id: newId }, req.body);
  // Pushing the new tour to tours
  tours.push(newTour);
  // writing the tours file with all new tours
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// ----------- updateTour -----------

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(400).json({ status: 'fail', message: 'invalid ID' });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here...>',
      },
    });
  }
};

// ----------- deleteTour -----------

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(400).json({ status: 'fail', message: 'invalid ID' });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};
// get basically setups a GET request(method) in the api route

// ----------- CRUD OPERATIONS -----------

// GET request
/*
app.get('/api/v1/tours', getAllTours); // <=>
app.get('/api/v1/tours/:id', getTourByID);

// POST request
app.post('/api/v1/tours', addNewTour);

// PATCH -- implementing path handling
app.patch('/api/v1/tours/:id', updateTour);

// DELETE -- implementing delete request
app.delete('/api/v1/tours/:id', deleteTour);
*/

// ------------ Chaining crud methods -----------

app.route('/api/v1/tours').get(getAllTours).post(addNewTour);

app.route('/api/v1/tours/:id').get(getTourByID).patch(updateTour).delete(deleteTour);


// 1. creating a route on certain port
// => (app.listen) <= runs a callback function on port specified.
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
