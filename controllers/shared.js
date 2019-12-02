const jwt = require('jwt-simple');

exports.createJWTForUser = function(user) {
  const timestamp = new Date().getTime();
  // The object is the payload created by jwt-simple. Will be encoded. Will be used, decoded, in the passport.js-file
  // The object key sub stands for subject and is included in the jwt-simple library
  // the object key iat stands for 'issued at time' and is included in the jwt-simple library
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRETSTRING);
};
