const bcrypt = require('bcrypt');
const OwnerProfile = require('../models/ownerProfileModel');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

// ===== Token Generators =====
const createAccessToken = (owner) =>
  jwt.sign(
    { id: owner._id, email: owner.email, userType: owner.userType || "Owner" },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

const createRefreshToken = (owner) =>
  jwt.sign(
    { id: owner._id, email: owner.email, userType: owner.userType || "Owner" },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

// ===== Controller =====
const ownerCtrl = {
  // REGISTER OWNER
  register: async (req, res) => {
    try {
      const {
        ownerName,
        shopName,
        businessRegId,
        email,
        contactNumber,
        shopAddress,
        pinCode,
        password,
        ownerCode,
      } = req.body;

      if (ownerCode !== process.env.OWNER_SECRET) {
        return res.status(403).json({ msg: 'Invalid owner code' });
      }

      const existingOwner = await OwnerProfile.findOne({ email });
      if (existingOwner)
        return res.status(400).json({ msg: 'Email already exists.' });

      if (password.length < 6)
        return res.status(400).json({ msg: 'Password must be at least 6 characters.' });

      const hashedPassword = await bcrypt.hash(password, 10);

      // Handle uploaded profile picture
      const profilePic = req.files?.profilePic;
      let profilePicPath = '';

      if (profilePic) {
        const uploadsDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

        const fileName = `${Date.now()}_${profilePic.name}`;
        const uploadPath = path.join(uploadsDir, fileName);

        await profilePic.mv(uploadPath);
        profilePicPath = `/uploads/${fileName}`;
      }

      const newOwner = new OwnerProfile({
        ownerName,
        shopName,
        businessRegId,
        email,
        contactNumber,
        shopAddress,
        pinCode,
        password: hashedPassword,
        profilePic: profilePicPath,
      });

      await newOwner.save();

      const accessToken = createAccessToken(newOwner);
      const refreshToken = createRefreshToken(newOwner);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/owner/refresh_token',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });

      res.status(201).json({
        msg: 'Owner registered successfully',
        ownerId: newOwner._id,
        accessToken,
        userType: newOwner.userType || "Owner",
      });
    } catch (err) {
      console.error('[ownerCtrl] Register Error:', err.message);
      res.status(500).json({ msg: err.message });
    }
  },

  // LOGIN OWNER
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const owner = await OwnerProfile.findOne({ email });
      if (!owner) return res.status(400).json({ msg: 'Owner not found.' });

      const isMatch = await bcrypt.compare(password, owner.password);
      if (!isMatch) return res.status(400).json({ msg: 'Incorrect password.' });

      const accessToken = createAccessToken(owner);
      const refreshToken = createRefreshToken(owner);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/owner/refresh_token',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });

      res.json({
        msg: 'Login successful',
        ownerId: owner._id,
        userType: owner.userType || "Owner",
        accessToken,
      });
    } catch (err) {
      console.error('[ownerCtrl] Login Error:', err.message);
      res.status(500).json({ msg: err.message });
    }
  },

  // REFRESH TOKEN
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) return res.status(401).json({ msg: 'No refresh token.' });

      const verified = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
      const owner = await OwnerProfile.findById(verified.id);
      if (!owner) return res.status(400).json({ msg: 'Owner not found.' });

      const accessToken = createAccessToken(owner);
      const refreshToken = createRefreshToken(owner);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/owner/refresh_token',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });

      res.json({ accessToken });
    } catch (err) {
      console.error('[ownerCtrl] Refresh Token Error:', err.message);
      res.status(403).json({ msg: 'Invalid refresh token.' });
    }
  },

  // GET OWNER PROFILE
  getOwnerProfile: async (req, res) => {
    try {
      const owner = await OwnerProfile.findById(req.user.id).select('-password');
      if (!owner) return res.status(404).json({ msg: 'Owner not found' });

      res.json(owner);
    } catch (err) {
      console.error('[ownerCtrl] getOwnerProfile Error:', err.message);
      res.status(500).json({ msg: err.message });
    }
  },

  // UPDATE OWNER PROFILE
  updateOwnerProfile: async (req, res) => {
    try {
      const updates = req.body;
      const updatedOwner = await OwnerProfile.findByIdAndUpdate(
        req.user.id,
        updates,
        { new: true }
      ).select('-password');

      if (!updatedOwner)
        return res.status(404).json({ msg: 'Owner not found' });

      res.json(updatedOwner);
    } catch (err) {
      console.error('[ownerCtrl] updateOwnerProfile Error:', err.message);
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = ownerCtrl;
