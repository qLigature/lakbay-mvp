const express = require('express');
const router = express.Router();
const user = require('../controllers/user-controller');

router.get('/profile', user.viewProfile);

module.exports = router;
