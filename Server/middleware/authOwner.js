const Users = require('../models/userModel');

const authOwner = async (req, res, next) => {
  try {
    // req.user comes from auth.js
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found." });

    // Only owners can proceed
    if (user.userType !== 'owner') {
      return res.status(403).json({ msg: "Access denied. Only owners can post advertisements." });
    }

    next(); // Owner verified, proceed to controller
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authOwner;
