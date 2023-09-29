const mongooese = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');
const { default: mongoose } = require('mongoose');

// ----------------- CONFIGURING DOTENV FOR ENVIRON Variables ----------------

dotenv.config({
  path: `${__dirname}/config.env`,
});

// ---------------- CONFIGURING mongoose ------------------

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// ----------------- Connecting MONGODB database with mongoose.connect() ----------------
mongoose
  .connect(DB)
  // .then((con) => console.log(con.connections))
  .catch((err) => console.log(err));

// ----------------- creating schema ----------------

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Tour must have a name`],
    unique: true
  },
  rating: {
    type: Number, 
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, `Tour must have a price`] // Schema type options -- objects
  },
})

// const usersSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, `User must have a name`]
//   }
// })

// const User = mongoose.model('User', userSchema);
const Tour = mongoose.model('Tour', toursSchema)


// 1. creating a route on certain port
// => (app.listen) <= runs a callback function on port specified.
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
