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


// -------------------------------
// FETCH ALL USERS (PUBLIC)
// -------------------------------
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// -------------------------------
// DELETE USER BY ID
// -------------------------------
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Delete failed" });
  }
});

module.exports = router;