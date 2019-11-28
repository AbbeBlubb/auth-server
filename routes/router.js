const User = require('../models/User');
const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  // request, response, next will be used for error handling
  res.send(['Elvis', 'Jacko']);
});


// Construct the document
const userModel = new User({
  date: Date(),
  email: 'test',
  password: 'hello'
});


// Write to DB
//userModel.save();
// Works!

module.exports = router;
