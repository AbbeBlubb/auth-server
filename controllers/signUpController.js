const jwt = require('jwt-simple');
const User = require('../models/User');


// ## Create new user ##

function createJWTForUser(user) {
  const timestamp = new Date().getTime();
  // The object is the payload created by jwt-simple. Will be encoded. Will be used, decoded, in the passport.js-file
  // The object key sub stands for subject and is included in the jwt-simple library
  // the object key iat stands for 'issued at time' and is included in the jwt-simple library
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRETSTRING);
}

module.exports = function signUpController(req, res, next) {
  const { email, password } = req.body;

  // To avoid a document without password in the DB (else it will give success response)
  // To do: add validation to email!
  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide a password' });
  }

  // See if a user with the given email already exists
  User.findOne({ email }, function(err, existingUser){
    if(err) { return next(err); }

    // If a user email does exist, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save a user record
    // Construct the document
    const user = new User({
      date: Date(),
      email,
      password
    });

    //Save the document to the DB
    user.save(function(err) {
      if(err) { return next(err); }

      // Respond to request indicating the user was created
      //return res.json(user);
      return res.json({ token: createJWTForUser(user), userId: user.id });
    });
  });
};
