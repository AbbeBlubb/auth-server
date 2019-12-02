const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local');

// ## Create local strategy ##
// For sign in, strategy 'local' is used.

const localOptions = { usernameField: 'email' };

// Email and password are pulled out form the request
// First arg. is options. As default Passport will look for request->username/password. Because the request will have email/password, it must be specified where to find the username. 
// Second arg is callback
const loacalLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify the given username and password, call done with the user
  // If the email and password is correct
  // Otherwise, call done with false
  User.findOne({ email }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false); }

    // Compare passwords: is the DB password equal to user.password
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }
      // The 'done' callback will add .user to the incoming request that is passed from this middleware (requireSignIn.js) to the signInController.js
      return done(null, user);
    });
  });
});

// ## Tell passport to use this strategy ##
passport.use(loacalLogin);
