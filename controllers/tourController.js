const Tour = require('../models/tourModel');

// --------- ROUTE HANDLERS ----------
// these below functions ⬇️ are called route handler or CONTROLLERS
// ----------- getAllTours -----------

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'Success',
      results: tours.length,
      requestAt: req.requestTime,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// ----------- getTourByID -----------

exports.getTourByID = async (req, res) => {
  // My code

  try {
    const reqTour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      //  results: tours.length,
      data: {
        reqTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// ----------- addNewTour -----------

exports.addNewTour = async (req, res) => {
  // const newTour = new Tour({})
  // newTour.save();

  try {
    const newTour = await Tour.create(req.body);

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
    });
  }
};

// ----------- updateTour -----------

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); // => first arg
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {}
};

// ----------- deleteTour -----------

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
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
