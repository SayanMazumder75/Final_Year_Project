// middleware/authOwner.js
const Users = require('../models/ownerProfileModel');

const authOwner = async (req, res, next) => {
  try {
    console.log("[authOwner] Checking owner role for:", req.user);

    // req.user comes from auth.js
    const user = await Users.findById(req.user.id);
    if (!user) {
      console.log("[authOwner] User not found");
      return res.status(404).json({ msg: "User not found." });
    }

    if (user.userType !== 'owner') {
      console.log(" [authOwner] Not an owner, type =", user.userType);
      return res.status(403).json({ msg: "Access denied. Only owners can post advertisements." });
    }

    console.log(" [authOwner] Owner verified:", user.email);
    next(); // Owner verified, proceed to controller
  } catch (err) {
    console.error(" [authOwner] Error:", err.message);
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authOwner;
