// const mongoose = require('mongoose');
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
  .then((con) => console.log('Database successfully connected'))
  .catch((err) => console.log(err));

// 1. creating a route on certain port
// => (app.listen) <= runs a callback function on port specified.
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
