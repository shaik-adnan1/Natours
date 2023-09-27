const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// ---------- MIDDLEWARE --------- -> a function that can modify the incoming request data
app.use(morgan('dev'));

app.use(express.json());

// creating our own middleware

app.use((req, res, next) => {
  console.log(`Hello from the middleware 2💀`);
  console.log(`request: ${req} \n response: ${res} \n`); // does nothing
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// --------- ROUTE HANDLERS ----------
// these below functions ⬇️ are called route handler or CONTROLLERS
// ----------- getAllTours -----------

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  // this function is called route handler
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    requestAt: req.requestTime,
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

// ----------- USERS handling functions -----------

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route has not yet been defined'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route has not yet been defined'
  })
}

const getUserByID = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route has not yet been defined'
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route has not yet been defined'
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route has not yet been defined'
  })
}

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

// ------------ ROUTES ----------------

const tourRouter = express.Router(); // -> this is also a middleware
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(addNewTour);

tourRouter
  .route('/:id')
  .get(getTourByID)
  .patch(updateTour)
  .delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter
  .route('/:id')
  .get(getUserByID)
  .patch(updateUser)
  .delete(deleteUser);

// Created new two sub routers 
app.use('/api/v1/tours', tourRouter);
app.use('api/v1/users', userRouter);

// 1. creating a route on certain port
// => (app.listen) <= runs a callback function on port specified.
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
