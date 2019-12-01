const passport = require('passport');
// The passportStrategy MUST be required
//const passportStrategy = require('./passportStrategy');
require('./passportStrategy');

// ## Create middleware for Passport auth ##
// 'jwt': use the jwt strategy
// By default, Passport will create a cookie-based auth session. If want to use JWT, this default option must be turned off
exports.requireAuth = passport.authenticate('jwt', { session: false });
