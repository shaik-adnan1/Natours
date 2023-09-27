// ------------ ROUTES ----------------
const express = require('express');
const tourController = require('./../controllers/tourController')


// ------------ ROUTES -------------

const router = express.Router(); // -> this is also a middleware

router.route('/').get(tourController.getAllTours).post(tourController.addNewTour);

router.route('/:id').get(tourController.getTourByID).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;
