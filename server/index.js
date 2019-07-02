// required libraries
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

// create express app
const app = express();

ogvdiovo

// connect to mongoose db
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...')) // eslint-disable-line no-console
  .catch(err => console.log(err)); // eslint-disable-line no-console

// config passport
require('./config/passport')(passport);

// set up express application
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// set up passport
app.use(session({ secret: 'ilovepulledporkandbrisket' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./routes/api')(app, passport);

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
