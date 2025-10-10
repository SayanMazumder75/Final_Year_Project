// Middleware to check if user is admin
const Users = require('../models/userModel');

const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found." });

    // Assuming user.role === 1 means admin
    if (user.role === 0)
      return res.status(403).json({ msg: "Access denied, admin only." });

    // Proceed if admin
    next();

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authAdmin;
