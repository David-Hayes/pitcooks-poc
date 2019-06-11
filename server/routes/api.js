// TODO babel-node

module.exports = app => {
  const apiRoute = '/api';

  // @route   GET /api/status
  // @desc    Check api routing is up an running
  // @acesss  Public
  app.get(`${apiRoute}/status`, (req, res) => {
    res.json({ success: true });
  });

  // @route   GET /api/user/status
  // @desc    Check api routing is up an running
  // @acesss  Public
  app.get(`${apiRoute}/user/status`, (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ success: true });
    } else {
      res.json({ loggedIn: false });
    }
  });

  // @route   POST /api/user/login
  // @desc    Authenticate user
  // @access  Public
  app.post(`${apiRoute}/user/login`, (req, res) => {
  });

  // @route   GET /api/user/logout
  // @desc    Log user out
  // @access  Public
  app.post(`${apiRoute}/user/logout`, (req, res) => {
    req.logout();
    res.json({ success: true });
  });

  // @route   POST /api/user/register
  // @desc    Authenticate user
  // @access  Public
  app.post(`${apiRoute}/user/register`, (req, res) => {
  });
};
