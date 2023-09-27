const app = require('./app')

// 1. creating a route on certain port
// => (app.listen) <= runs a callback function on port specified.
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

