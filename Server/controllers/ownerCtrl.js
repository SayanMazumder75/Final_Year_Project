const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OwnerProfile = require('../models/ownerProfileModel');

// Token helpers
const createAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
function createRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

const userCtrl = {
  // Register user (buyer or owner)

register: async (req, res) => {
  try {
    const {
      name, email, password, userType, ownerCode,
      phoneNumber, address, pincode,
      shopName, businessRegId, gstNumber
    } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "The email already exists." });

    if (password.length < 6)
      return res.status(400).json({ msg: "Password must be at least 6 characters." });

    // Owner validation
    if (userType === 'owner') {
      if (ownerCode !== process.env.OWNER_SECRET) {
        return res.status(403).json({ msg: "Invalid owner code. Cannot register as owner." });
      }

      if (!shopName || !businessRegId) {
        return res.status(400).json({ msg: "Missing shop name or business registration ID." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      name,
      email,
      password: hashedPassword,
      userType: userType || 'user',
      phoneNumber,
      address,
      pincode
    });

    await newUser.save();

    // Create owner profile only if userType is owner
    if (userType === 'owner') {
      const ownerProfile = new OwnerProfile({
        user: newUser._id,
        shopName,
        businessRegId,
        gstNumber
      });

      await ownerProfile.save();
    }

    const accessToken = createAccessToken({ id: newUser._id, userType: newUser.userType });
    const refreshToken = createRefreshToken({ id: newUser._id, userType: newUser.userType });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/user/refresh_token',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax'
    });

    res.status(201).json({
      msg: "User registered successfully",
      user: newUser._id,
      userType: newUser.userType,
      accessToken
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
},

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      const accessToken = createAccessToken({ id: user._id, userType: user.userType });
      const refreshToken = createRefreshToken({ id: user._id, userType: user.userType });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      });

      res.json({
        msg: "Login successful",
        user: user._id,
        userType: user.userType,
        accessToken
      });

    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Logout
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/user/refresh_token' });
      res.json({ msg: "Logged out successfully." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Refresh token
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) return res.status(401).json({ msg: "No refresh token, authorization denied." });

      const verified = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);

      const existingUser = await Users.findById(verified.id);
      if (!existingUser) return res.status(400).json({ msg: "User no longer exists." });

      // Create new access and refresh tokens
      const accessToken = createAccessToken({ id: verified.id, userType: verified.userType });
      const refreshToken = createRefreshToken({ id: verified.id, userType: verified.userType });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      });

      res.json({ accessToken });

    } catch (err) {
      res.status(403).json({ msg: "Invalid refresh token." });
    }
  },

  // Get logged-in user info
  getUserInfo: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ msg: "User not found." });
      res.json(user);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = userCtrl;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OwnerProfile = require('../models/ownerProfileModel');
const Users = require('../models/userModel');
