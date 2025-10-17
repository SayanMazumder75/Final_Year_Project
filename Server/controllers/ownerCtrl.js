const bcrypt = require('bcrypt');
const OwnerProfile = require('../models/ownerProfileModel');
const jwt = require('jsonwebtoken');

// Token helpers
const createAccessToken = (owner) => jwt.sign(owner, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
const createRefreshToken = (owner) => jwt.sign(owner, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

const ownerCtrl = {
  register: async (req, res) => {
    try {
      const { ownerName, shopName, businessRegId, email, contactNumber, shopAddress, pinCode, password, ownerCode } = req.body;

      if (ownerCode !== process.env.OWNER_SECRET) {
        return res.status(403).json({ msg: "Invalid owner code" });
      }

      const existingOwner = await OwnerProfile.findOne({ email });
      if (existingOwner) return res.status(400).json({ msg: "Email already exists." });

      if (password.length < 6) return res.status(400).json({ msg: "Password must be at least 6 characters." });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newOwner = new OwnerProfile({
        ownerName, shopName, businessRegId, email, contactNumber, shopAddress, pinCode, password: hashedPassword
      });

      await newOwner.save();

      const accessToken = createAccessToken({ id: newOwner._id, email: newOwner.email });
      const refreshToken = createRefreshToken({ id: newOwner._id, email: newOwner.email });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/owner/refresh_token',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      });

      res.status(201).json({ msg: "Owner registered successfully", ownerId: newOwner._id, accessToken });

    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const owner = await OwnerProfile.findOne({ email });
      if (!owner) return res.status(400).json({ msg: "Owner not found." });

      const isMatch = await bcrypt.compare(password, owner.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      const accessToken = createAccessToken({ id: owner._id, email: owner.email });
      const refreshToken = createRefreshToken({ id: owner._id, email: owner.email });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/owner/refresh_token',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      });

      res.json({ msg: "Login successful", ownerId: owner._id, accessToken });

    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) return res.status(401).json({ msg: "No refresh token." });

      const verified = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
      const owner = await OwnerProfile.findById(verified.id);
      if (!owner) return res.status(400).json({ msg: "Owner not found." });

      const accessToken = createAccessToken({ id: owner._id, email: owner.email });
      const refreshToken = createRefreshToken({ id: owner._id, email: owner.email });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/owner/refresh_token',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      });

      res.json({ accessToken });
    } catch (err) {
      res.status(403).json({ msg: "Invalid refresh token." });
    }
  }
};

module.exports = ownerCtrl;
