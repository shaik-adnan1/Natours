const mongoose = require('mongoose');

// ----------------- creating schema ----------------

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Tour must have a name`],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, `Tour must have a duration`],
  },
  maxGroupSize: {
    type: Number,
    required: [true, `Tour must have a maxGroupSize`],
  },
  difficulty: {
    type: String,
    required: [true, `Tour must have a difficulty`],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, `Tour must have a price`], // Schema type options -- objects
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    required: [true, `Tour must have a summary`],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, `Tour must have a image`]
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
  

});

const Tour = new mongoose.model('Tour', toursSchema);

module.exports = Tour;
