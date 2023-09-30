const mongoose = require('mongoose');

// ----------------- creating schema ----------------

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Tour must have a name`],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, `Tour must have a price`], // Schema type options -- objects
  },
});

const Tour = new mongoose.model('Tour', toursSchema);

module.exports = Tour;