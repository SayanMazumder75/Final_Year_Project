const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

// User routes
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/refresh_token', userCtrl.refreshToken);

module.exports = router;
