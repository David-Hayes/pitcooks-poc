// TODO babel-node

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
      // console.log(req.session.passport.user.local);
      res.json({ success: true });
    } else {
      res.json({ loggedIn: false });
    }
  });

  // @route   POST /api/user/login
  // @desc    Authenticate user
  // @access  Public
  // app.post(`${apiRoute}/user/login`, (req, res) => {
  //   passport.authenticate('local-login', (err, user) => {
  //     if (err) res.json({ success: false, error_code: 1, error_message: err });
  //     if (!user) {
  //       res.json({ success: false, error_code: 3, error_message: 'some error' });
  //     } else {
  //       console.log(user);
  //       res.json({ success: true });
  //     }
  //   })(req, res);
  // });
  app.post(`${apiRoute}/user/login`, passport.authenticate('local-login', {
    successRedirect: '/api/user/status', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // @route   GET /api/user/logout
  // @desc    Log user out
  // @access  Public
  app.get(`${apiRoute}/user/logout`, (req, res) => {
    req.logout();
    res.json({ success: true });
  });

  // @route   POST /api/user/register
  // @desc    Authenticate user
  // @access  Public
  app.post(`${apiRoute}/user/register`, (req, res) => {
    passport.authenticate('local-signup', (err, user) => {
      if (err) res.json({ success: false, error_code: 1, error_message: err });
      if (!user) {
        res.json({ success: false, error_code: 2, error_message: 'User already exists' });
      } else {
        res.json({ success: true });
      }
    })(req, res);
  });
};
