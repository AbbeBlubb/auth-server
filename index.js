const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');



// Create an instance of express
const app = express();



// App setup

// Middlewares; all requests are passed to these in order
app.use(morgan('combined')); // Morgan logs incoming requests to the console. Practical for debugging
app.use(bodyParser.json({type: '*/*'})); // Parses incoming requests, specifically to JSON



// Server setup - getting the express application to talk to the world
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on port: ', port);
