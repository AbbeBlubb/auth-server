const express = require('express');
const cors = require('cors');
const routes = require('./routes/router');
const bodyParser = require('body-parser');
const morgan = require('morgan');


// App setup

// Start/create the Express app / create an instance of express
// Exported at the end of the file
const app = express();

// Middlewares; all requests are passed to these in order

// Morgan logs incoming requests to the console. Practical for debugging
app.use(morgan('combined'));

// Parse incoming requests, specifically to JSON
app.use(bodyParser.json({type: '*/*'}));

// Avoid CORS block on client
app.use(cors());

// Set indentation to 2 spaces for response
app.set('json spaces', 2);

// Use routes from separate file
app.use('/', routes);

module.exports = app;
