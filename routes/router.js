const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const signUpController = require('../controllers/signUpController');
const signInController = require('../controllers/signInController');
const rootController = require('../controllers/rootController');
const requireAuth = require('../services/requireAuth').requireAuth;
const requireSignIn = require('../services/requireSignIn').requireSignIn;


// ## Routes ##
router.get('/test', testController);
router.post('/signup', signUpController);
// For sign in requests, the request must pass middleware: the local authentication strategy, before passing to the signInController/callback
router.post('/signin', requireSignIn, signInController);
// For auth requests, the request must pass the JWT authentication strategy before the callback is fired. If not, the passport.js will handle the response
router.get('/', requireAuth, rootController);

module.exports = router;
