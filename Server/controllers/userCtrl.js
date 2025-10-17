const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Token helpers
const createAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
const createRefreshToken = (user) => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, phoneNumber, address, pincode, password } = req.body;

      const existingUser = await Users.findOne({ email });
      if (existingUser) return res.status(400).json({ msg: "Email already exists." });

      if (password.length < 6) return res.status(400).json({ msg: "Password must be at least 6 characters." });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new Users({ name, email, phoneNumber, address, pincode, password: hashedPassword });
      await newUser.save();

      const accessToken = createAccessToken({ id: newUser._id, email: newUser.email });
      const refreshToken = createRefreshToken({ id: newUser._id, email: newUser.email });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      });

      res.status(201).json({ msg: "User registered successfully", userId: newUser._id, accessToken });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User not found." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      const accessToken = createAccessToken({ id: user._id, email: user.email });
      const refreshToken = createRefreshToken({ id: user._id, email: user.email });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      });

      res.json({ msg: "Login successful", userId: user._id, accessToken });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) return res.status(401).json({ msg: "No refresh token." });

      const verified = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
      const user = await Users.findById(verified.id);
      if (!user) return res.status(400).json({ msg: "User not found." });

      const accessToken = createAccessToken({ id: user._id, email: user.email });
      const refreshToken = createRefreshToken({ id: user._id, email: user.email });

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
  }
};

module.exports = userCtrl;
