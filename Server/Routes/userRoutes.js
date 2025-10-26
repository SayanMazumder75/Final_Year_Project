// const router = require('express').Router();
// const userCtrl = require('../controllers/userCtrl');

// // User routes
// router.post('/register', userCtrl.register);
// router.post('/login', userCtrl.login);
// router.post('/refresh_token', userCtrl.refreshToken);

// module.exports = router;
const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const User = require('../models/userModel'); // Make sure you have a User model

// -------------------------------
// AUTH + REGISTRATION ROUTES
// -------------------------------
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/refresh_token', userCtrl.refreshToken);

module.exports = router;