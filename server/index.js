// required libraries
const express = require('express');

// create express app
const app = express();

// print something by default
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// create port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));