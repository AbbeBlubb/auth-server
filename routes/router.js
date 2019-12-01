const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
const rootController = require('../controllers/rootController');


router.get('/', rootController);
router.post('/signup', authenticationController);

module.exports = router;
