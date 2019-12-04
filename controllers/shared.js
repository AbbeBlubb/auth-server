const jwt = require('jwt-simple');

/** ## shared.createJWTForUser ##
  createJWTForUser takes 'user' as arg to return a token.
  user from signUpController: instance of new User (model), that is saved to the DB.
  user from signInController: passportLocalStrategy adds .user to the req with the Passport callback 'done'. This req.user is used in signInController to call createJWTForUser.
  jwt.encode first arg: sub / subject (will be encoded), iat / issued at time, both included as key's in the jwt-simple library.
  jwt.encode second arg: secret string
  */

exports.createJWTForUser = function(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRETSTRING);
};
