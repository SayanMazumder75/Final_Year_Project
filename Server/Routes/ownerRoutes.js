const router = require('express').Router();
const ownerCtrl = require('../controllers/ownerCtrl');
const auth = require('../middleware/auth');
const OwnerProfile = require('../models/ownerProfileModel');

// -------------------------------
// AUTH + REGISTRATION ROUTES
// -------------------------------
router.post('/register', ownerCtrl.register);
router.post('/login', ownerCtrl.login);
router.post('/refresh_token', ownerCtrl.refreshToken);

// -------------------------------
// FETCH LOGGED-IN OWNER PROFILE
// -------------------------------
router.get('/me', auth, async (req, res) => {
  try {
    const owner = await OwnerProfile.findById(req.user.id).select('-password');
    if (!owner) return res.status(404).json({ msg: "Owner not found" });

    res.json(owner);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// -------------------------------
// FETCH ALL OWNERS (PUBLIC)
// -------------------------------
router.get('/owners', async (req, res) => {
  try {
    const owners = await OwnerProfile.find().select('-password');
    res.json(owners);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// -------------------------------
// DELETE OWNER BY ID
// -------------------------------
router.delete('/owners/:id', async (req, res) => {
  try {
    const deletedOwner = await OwnerProfile.findByIdAndDelete(req.params.id);

    if (!deletedOwner) {
      return res.status(404).json({ msg: "Owner not found" });
    }

    res.json({ msg: "Owner deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Delete failed" });
  }
});

module.exports = router;
