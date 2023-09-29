const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// ---------- MIDDLEWARE --------- -> a function that can modify the incoming request data
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// creating our own middleware

app.use((req, res, next) => {
  console.log(`Hello from the middleware 2💀`);
  // console.log(`request: ${req} \n response: ${res} \n`); // does nothing
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

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

// Created new two sub routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
