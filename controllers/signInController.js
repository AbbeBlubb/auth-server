const shared = require('./shared');


// The user has passed the middleware in requireSignin.js. Return a token
module.exports = function signInController(req, res) {
  // The .user in the req obj is added in the passportLocalStrategy, it's done in the Passport callback named 'done'
  res.send( {
    now: 'you passed to the signInController!',
    token: shared.createJWTForUser(req.user) });
};
