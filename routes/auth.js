const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth-controller');

router.post('/register', auth.registerUser);

module.exports = router;
