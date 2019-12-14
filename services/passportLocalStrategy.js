const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local');

// ## SIGN IN - Create local strategy ##
// For sign in, strategy 'local' is used.

// Options object to be fed into the local strategy options
const localOptions = { usernameField: 'username' };

// Username and password are pulled out form the request
// First arg. is options.
//   - As default Passport will look for request->username/password.
//   - Before this strategy used email/password and this was what the request had, and therefore it had to be specified where to find the username.
//   - For the MVP I changed the login to username, so technically the localOptins is not needed, but I keep it as the optimal is to look at both username and email for login.
// Second arg is callback
const loacalLogin = new LocalStrategy(localOptions, function(username, password, done) {
  // Verify the given username and password,
  // - If the username and password is incorrect, call done with false
  // - If the username and password is correct, call done with the user
  User.findOne({ username }, function(err, user) {
    if(err) { return done(err); }
    // TO DO: add connect-flash to use flash errors (the arror in done will be accessible with connect-flash)
    if(!user) { return done(null, false, { error: 'Username not found or password is incorrect'}); }

    // Compare passwords: is the DB password equal to user.password
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      // TO DO: add connect-flash to use flash errors (the arror in done will be accessible with connect-flash)
      if(!isMatch) { return done(null, false, { error: 'Username not found or password is incorrect'}); }
      // The 'done' callback will add .user to the incoming request that is passed from this middleware (requireSignIn.js) to the signInController.js
      return done(null, user);
    });
  });
});

// ## Tell passport to use this strategy ##
passport.use(loacalLogin);
