const passport = require('passport');

// ## Create middleware for Passport auth ##
// 'jwt': use the jwt strategy
// By default, Passport will create a cookie-based auth session. If want to use JWT, this default option must be turned off
exports.requireAuth = passport.authenticate('jwt', { session: false });
