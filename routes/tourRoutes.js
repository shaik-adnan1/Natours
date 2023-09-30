// ------------ ROUTES ----------------
const express = require('express');
const tourController = require('./../controllers/tourController');

// ------------ ROUTES -------------

const router = express.Router(); // -> this is also a middleware

// router.param('id', tourController.checkID);



// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addNewTour);

router
  .route('/:id')
  .get(tourController.getTourByID)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
