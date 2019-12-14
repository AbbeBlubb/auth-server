const User = require('../models/User');
const shared = require('./shared');


// ## Create new user ##

module.exports = function signUpController(req, res, next) {
  const { email, password, username } = req.body;

  // To avoid a document without password in the DB (else it will give success response)
  // To do: add possibility to log in with email
  // To do: add validation to email!
  if(!username || !password) {
    return res.status(422).send({ error: 'You must provide a username and a password' });
  }

  // See if a user with the given username already exists
  // To do: also check for email
  User.findOne({ username }, function(err, existingUserName){
    if(err) { return next(err); }

    // If a user username does exist, return an error
    if(existingUserName) {
      return res.status(422).send({ error: 'The given username is in use' });
    }

    // If a user with the given username does NOT exist, create and save a user record
    // Construct the document
    const user = new User({
      date: Date(),
      email,
      password,
      username
    });

    //Save the document to the DB
    user.save(function(err) {
      if(err) { return next(err); }

      // Respond to request indicating the user was created
      return res.json({
        token: shared.createJWTForUser(user),
        userId: user.id,
        username: user.username,
        date: user.date
      });
    });
  });
};
