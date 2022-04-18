const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth-controller');

router.post('/register', auth.registerUser);
router.post('/login', auth.login);

module.exports = router;
