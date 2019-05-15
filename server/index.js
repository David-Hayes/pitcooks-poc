// required libraries
const express = require('express');

// create express app
const app = express();

// routes
require('./routes/api')(app);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // eslint-disable-line no-undef
  });
} else {
  // print something by default
  app.get('/', (req, res) => {
    res.send('Hello world!');
  });
}

// create port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`)); // eslint-disable-line no-console
