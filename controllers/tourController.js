
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(400).json({ status: 'fail', message: 'invalid ID' });
  }
  next();
}

// --------- ROUTE HANDLERS ----------
// these below functions ⬇️ are called route handler or CONTROLLERS
// ----------- getAllTours -----------

exports.getAllTours = (req, res) => {
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

exports.getTourByID = (req, res) => {
  // My code

  const id = req.params.id;
  const reqTour = tours[id];

  // Alternative
  // const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id)

  // if (id > tours.length) {
  
  // retrieving tour matching to id parameter
  // console.log()
  res.status(200).json({
    status: 'Success',
    // results: tours.length,
    data: {
      reqTour,
    },
  });
};

// ----------- addNewTour -----------

exports.addNewTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

// ----------- deleteTour -----------

exports.deleteTour = (req, res) => {
  
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// ------------ checkBody ------------

exports.checkBody = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.body.name);
  // console.log(req.body.description);
  // console.log(req.body.price);

 if(!req.body.name || !req.body.price) {
  res.status(400).json({
    status: 'fail',
    message: 'Please fill in all fields',
  })
 }
 next();
};