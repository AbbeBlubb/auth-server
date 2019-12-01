const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// ## Setup options for the JWT Strategy ##
const jwtOptions = {
  // Tell Passport (in the JwtStrategy) where in the request to find the token
  // Request must have headers with key: Authorization, and value: JWT XXX
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  // Tell Passport (in the JwtStrategy) where the secret string is, to decode the payload
  secretOrKey: process.env.SECRETSTRING
};

// ## Create the JWT Strategy ##
// The payload contains the decoded JWT token, that is, the decoded subject/user.id and the iat/timestamp
// The second argument is the callback
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  console.log('passport.js payload: ', payload);
  // See if the sub/user.id in the payload exists in the DB
  // If it does, call the done-callback with that object
  // Otherwise, call the done-callback without a user object
  User.findById(payload.sub, function(err, user) {
    // If search could not occur because of an error from findById, call done with the error and instead of an object, a false
    if (err) { return done(err, false); }
    if(user) {
      // If search occured and user exists, call done with null (no error) and the user object
      done(null, user);
    } else {
      // If user was not found. Search did occur, but user was not found
      done(null, false);
    }
  });
});

// ## Tell passport to use this strategy ##
passport.use(jwtLogin);
