const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signUpController');
const testController = require('../controllers/testController');
const rootController = require('../controllers/rootController');
const requireAuth = require('../services/requireAuth').requireAuth;


// ## Routes ##
router.get('/test', testController);
router.post('/signup', signUpController);
// For auth requests, the request must pass the JWT authentication strategy before the callback is fired. If not, the passport.js will handle the response
router.get('/', requireAuth, rootController);

module.exports = router;
