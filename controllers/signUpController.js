const User = require('../models/User');
const shared = require('./shared');


// ## Create new user ##

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
      return res.json({ token: shared.createJWTForUser(user), userId: user.id });
    });
  });
};
