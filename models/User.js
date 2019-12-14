const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


/** ## In this file ##
  - Define the scheema
  - Use the "pre-save hook" on the userSchema
  - Comparing passwords
  - Create the model / model class, with the scheema, and export
 */


// ## Define the scheema ##

const userSchema = new mongoose.Schema({
  date: Date,
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true }
});


// ## Use the "pre-save hook" on the userSchema ##

userSchema.pre('save', function(next) {

  // The context is the user model. userSchema is an instance of the User model.
  // User model is exported in this file and imported in the signUpController.js.
  // Inside this callback, const user is to reference user.username and user.password instead of this.username, this.password.
  const user = this;

  // Generate a salt, with complexity 10, and when that's ready, run callback
  bcrypt.genSalt(10, function(err, salt) {
    if(err) {return next(err); }

    // Hash (encrypt) the password, and use the generated salt (the password will be a hashed password with a salt in it). Then, run callback
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      // Overwrite the given plain text password with the encrypted-version-and-salt-containing password
      user.password = hash;
      console.log('Encrypted password: ', user.password);

      // Continue with next step after the pre-save hook callback
      next();
    });
  });
});


// ## Comparing passwords ##

// Create a method, comparePassword, that will have acces to the userSchema methods
// This method will be called in passportLocalStrategy.js
userSchema.methods.comparePassword = function(candidatePassword, callback) {
// this.passwords is a reference to the User class password
// Bcrypt makes the comparision
// this.password contains the salt + the hashed password
// Bcrypt will hash the given candidate password
// If equal, thisMatch will be true, else false
bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};


// ## Create the model / model class, with the scheema, and export ##

module.exports = mongoose.model('User', userSchema);
