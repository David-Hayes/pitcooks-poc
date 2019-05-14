module.exports = app => {
  const apiRoute = '/api';

  // @route   GET /api/status
  // @desc    Check api routing is up an running
  // @acesss  Public
  app.get(`${apiRoute}/status`, (req, res) => {
    res.json({ success: true });
  });
};
