const router = require('express').Router();
const ownerCtrl = require('../controllers/ownerCtrl');

// Owner registration and login routes
router.post('/register', ownerCtrl.register);
router.post('/login', ownerCtrl.login);
router.post('/refresh_token', ownerCtrl.refreshToken);

module.exports = router;
