const mongoose = require('mongoose');


// Define the scheema
const userSchema = new mongoose.Schema({
  date: Date,
  email: { type: String, unique: true },
  password: String
});

// Create the model / model class, with the scheema, and export
module.exports = mongoose.model('User', userSchema);
