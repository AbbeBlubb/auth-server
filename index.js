const mongoose = require('mongoose');
const helpers = require('./helpers');
const {stripIndents} = require('common-tags');


// Import .env-vars
//require('dotenv').config();


// Connect to DB, tell Mongoose to use ES6 promises, handle errors, inform about connection in console
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/';
mongoose.connect(mongoUrl, { useNewUrlParser: true, dbName: 'authentication' });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error('Message from index.js on connection error: ', err.message);
  console.error('Error object: ', err);
});
mongoose.connection.once('open', () => {
  console.log(
    stripIndents`
    ## auth-server application is connected to mongodb ##
    ## mongodb url: ${mongoUrl} ##`
  );
});


// Import the models for the app. Will be constructed in routes/index.js
require('./models/User');


// Start the app
const app = require('./app');


// Server setup - getting the express application to talk to the world
const port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log(
    stripIndents`
    ## Listening on port ${port} ##
    ## Time is: ${helpers.getTime()} ##`
  );
});
