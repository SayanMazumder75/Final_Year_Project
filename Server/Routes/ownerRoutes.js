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
// OWNER PROFILE ROUTES
// -------------------------------

// Get current owner profile
router.get('/me', auth, ownerCtrl.getOwnerProfile);

// Update current owner profile
router.put('/profile', auth, ownerCtrl.updateOwnerProfile);

// -------------------------------
// TEST + ADMIN ROUTES
// -------------------------------
router.get('/test', (req, res) => {
  res.send('Owner routes working!');
});

// Fetch all owners (public/admin)
router.get('/owners', async (req, res) => {
  try {
    const owners = await OwnerProfile.find().select('-password');
    res.json(owners);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete owner by ID (admin only)
router.delete('/owners/:id', async (req, res) => {
  try {
    const deletedOwner = await OwnerProfile.findByIdAndDelete(req.params.id);
    if (!deletedOwner) {
      return res.status(404).json({ msg: 'Owner not found' });
    }
    res.json({ msg: 'Owner deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Delete failed' });
  }
});

module.exports = router;
