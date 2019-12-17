const express = require('express');
const router = express.Router();
const pingController = require('../controllers/pingController');
const signUpController = require('../controllers/signUpController');
const signInController = require('../controllers/signInController');
const usersController = require('../controllers/usersController');
const requireAuth = require('../services/requireAuth').requireAuth;
const requireSignIn = require('../services/requireSignIn').requireSignIn;

/** ## Middlewares ##
  Router:
  First arg: route handler
  Second optional arg: middleware
  Third arg: callback/function/controller
  requireSignIn: uses local auth strategy. Must be passed before controller fires. Else, the response is handled by the stategy
  requireAuth: uses JWT auth strategy. -||-
*/

// ## Routes ##
router.get('/ping', pingController);
router.post('/signup', signUpController);
router.post('/signin', requireSignIn, signInController);
router.get('/users', requireAuth, usersController);

module.exports = router;
