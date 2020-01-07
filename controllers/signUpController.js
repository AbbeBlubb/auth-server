const User = require('../models/User');
const shared = require('./shared');
const requestIp = require('request-ip');


// ## Create new user ##

module.exports = function signUpController(req, res, next) {
  const { username, email, password } = req.body;
  const ipcreated = requestIp.getClientIp(req);

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
      username,
      email,
      password,
      ipcreated
    });

    // Save the document to the DB
    // Before save, the pre-save hook will fire a function that handles the password, se User.js
    user.save(function(err) {
      if(err) { return next(err); }

      // Respond to request indicating the user was created
      // If e.g. email is not provided, that key-value will automatically not be stored in the DB
      return res.json({
        userId: user.id,
        date: user.date,
        username: user.username,
        email: user.email,
        token: shared.createJWTForUser(user)
      });
    });
  });
};
