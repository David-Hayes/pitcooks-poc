// required libraries
const LocalStrategy = require('passport-local').Strategy;

// load user model
const User = require('../models/User');

// expose function
module.exports = passport => {
  // serialize user into passport session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // deserialize user from passport session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // local login
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ 'local.email': email }, (err, user) => {
      // return any errors
      if (err) return done(err);

      // no user found
      if (!user) return done(null, false);

      // user found, password wrong
      if (!user.validPassword(password)) return done(null, false);

      // all ok
      return done(null, user);
    });
  }));
};
