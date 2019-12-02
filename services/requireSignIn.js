const passport = require('passport');
// The passportStrategy MUST be required
//const passportStrategy = require('./passportStrategy');
require('./passportLocalStrategy');

// ## Create middleware for Passport auth ##
// 'local': use the local strategy
// By default, Passport will create a cookie-based auth session. If want to use JWT, this default option must be turned off
exports.requireSignIn = passport.authenticate('local', { session: false });
