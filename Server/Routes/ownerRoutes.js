const router = require('express').Router();
const ownerCtrl = require('../controllers/ownerCtrl');

// Owner registration and login routes
router.post('/register', ownerCtrl.register);
router.post('/login', ownerCtrl.login);
router.post('/refresh_token', ownerCtrl.refreshToken);

module.exports = router;

const auth = require('../middleware/auth'); // your existing auth.js
const OwnerProfile = require('../models/ownerProfileModel');

router.get('/me', auth, async (req, res) => {
  try {
    // req.user comes from auth middleware
    const owner = await OwnerProfile.findById(req.user.id).select('-password');
    if (!owner) return res.status(404).json({ msg: "Owner not found" });

    res.json(owner);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
