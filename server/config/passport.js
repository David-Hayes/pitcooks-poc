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

  // local signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    process.nextTick(() => {
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'local.email': email }, (err, user) => { // eslint-disable-line consistent-return
        // return any errors
        if (err) return done(err);

        // check if there is a user
        if (user) return done(null, false);

        // create user if one doesn't exist
        const newUser = new User();

        // set local credentials
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        // save user
        newUser.save(error => {
          if (err) throw error;
          return done(null, newUser);
        });
      });
    });
  }));

  // local login
  passport.use('local-login', new LocalStrategy({
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
