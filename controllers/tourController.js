const Tour = require('../models/tourModel');

// --------- ROUTE HANDLERS ----------
// these below functions ⬇️ are called route handler or CONTROLLERS
// ----------- getAllTours -----------

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  // this function is called route handler
  res.status(200).json({
    status: 'Success',
    // results: tours.length,
    // requestAt: req.requestTime,
    // data: {
    //   tours: tours,
    // },
  });
};

// ----------- getTourByID -----------

exports.getTourByID = (req, res) => {
  // My code

  const id = req.params.id;
  // const reqTour = tours[id];

  // Alternative
  // const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id)

  // if (id > tours.length) {
  
  // retrieving tour matching to id parameter
  // console.log()
  
  res.status(200).json({
    status: 'Success',
    // results: tours.length,
    // data: {
    //   reqTour,
    // },
  });
};

// ----------- addNewTour -----------

exports.addNewTour = async (req, res) => {
  
  // const newTour = new Tour({})
  // newTour.save();

  try {
    
    const newTour = await Tour.create(req.body)
  
    res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent or duplicate data found!',
    })
  }

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

// exports.checkBody = (req, res, next) => {
//   // console.log(req.body);
//   // console.log(req.body.name);
//   // console.log(req.body.description);
//   // console.log(req.body.price);

//  if(!req.body.name || !req.body.price) {
//   res.status(400).json({
//     status: 'fail',
//     message: 'Please fill in all fields',
//   })
//  }
//  next();
// };