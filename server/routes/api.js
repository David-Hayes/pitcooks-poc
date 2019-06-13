// TODO babel-node
const User = require('../models/User');

module.exports = (app, passport) => {
  const apiRoute = '/api';

  // @route   GET /api/status
  // @desc    Check api routing is up an running
  // @acesss  Public
  app.get(`${apiRoute}/apiStatus`, (req, res) => {
    res.json({ success: true });
  });

  // @route   GET /api/user/status
  // @desc    Check api routing is up an running
  // @acesss  Public
  app.get(`${apiRoute}/user/status`, (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ success: true, user: req.session.passport.user.local.email });
    } else {
      res.json({ loggedIn: false });
    }
  });

  // @route   POST /api/user/login
  // @desc    Authenticate user
  // @access  Public
  app.post(`${apiRoute}/user/login`, (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) res.json({ success: false, error_code: 1, error_message: err });
      if (!user) res.json({ success: false, error_code: 3, error_message: 'Username or password is wrong' });
      req.logIn(user, error => {
        if (error) res.json({ success: false, error_code: 1, error_message: err });
        res.json({ success: true });
      });
    })(req, res, next);
  });

  // @route   GET /api/user/logout
  // @desc    Log user out
  // @access  Public
  app.get(`${apiRoute}/user/logout`, (req, res) => {
    req.logout();
    res.json({ success: true });
  });

  // @route   POST /api/user/register
  // @desc    Register new user
  // @access  Public
  app.post(`${apiRoute}/user/register`, (req, res) => {
    // check if user exists already
    User.findOne({ 'local.email': req.body.email }, (err, user) => {
      if (user) {
        res.json({ success: false, error_code: 4, error_message: 'Email already in use' });
      } else {
        // create new user
        const newUser = new User({
          local: {
            email: req.body.email,
            name: req.body.name
          }
        });
        newUser.local.password = newUser.generateHash(req.body.password);

        newUser.save()
          .then(() => {
            res.json({ success: true });
          })
          .catch(errD => {
            res.json({ success: false, error_code: 1, error_message: errD });
          });
      }
    });
  });
};
