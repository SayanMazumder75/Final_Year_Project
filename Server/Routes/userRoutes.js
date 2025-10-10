const router = require('express').Router();
const userCtrl = require('../Controllers/userCtrl');
const auth = require('../middleware/auth'); // your auth middleware
const authOwner = require('../middleware/authOwner');

router.post('/owner/upload', auth, authOwner, (req, res) => {
  // same upload logic, but accessible to owners
    res.send('Owner upload endpoint');

});
// Owner-specific routes
router.get('/logout', userCtrl.logout);

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

// Refresh token route
router.post('/refresh_token', userCtrl.refreshToken);

// GET logged-in user info
router.get('/me', auth, userCtrl.getUserInfo);

module.exports = router;
