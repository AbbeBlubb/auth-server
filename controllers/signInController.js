const shared = require('./shared');


// The user has passed the middleware in requireSignin.js (requireSignin.js uses passportLocalStrategy.js). Return a token
module.exports = function signInController(req, res) {
  // The .user in the req obj is added in the passportLocalStrategy, it's done in the Passport callback named 'done'
  // From signInController.js: "The 'done' callback will add .user to the incoming request that is passed from this middleware (requireSignIn.js) to the signInController.js"
  res.send({
    userId: req.user.id,
    date: req.user.date,
    username: req.user.username,
    email: req.user.email,
    token: shared.createJWTForUser(req.user)
  });
};
