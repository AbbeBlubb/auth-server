const express = require('express');
const router = express.Router();
const Authentication = require('../controllers/authentication');
const Root = require('../controllers/root');


router.get('/', Root);
router.post('/signup', Authentication.signup);

module.exports = router;
