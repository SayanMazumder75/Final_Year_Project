// const router = require('express').Router();
// const ownerCtrl = require('../controllers/ownerCtrl');

// // Owner registration and login routes
// router.post('/register', ownerCtrl.register);
// router.post('/login', ownerCtrl.login);
// router.post('/refresh_token', ownerCtrl.refreshToken);

// module.exports = router;
// backend/routes/owners.js
// Routes/ownerRoutes.js
const express = require('express');
const router = express.Router();
const Owner = require('../Models/OwnerModel');

// Get all owners
router.get('/owners', async (req, res) => {
  try {
    const owners = await Owner.find().sort({ createdAt: -1 });
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new owner
router.post('/owners', async (req, res) => {
  try {
    const { name, phone, city, dealershipName } = req.body;

    // Check if owner already exists
    const existingOwner = await Owner.findOne({ dealershipName });
    if (existingOwner) {
      return res.status(400).json({ message: 'Owner with this dealership name already exists' });
    }

    const newOwner = new Owner({
      name,
      phone: phone || "+91 ",
      city,
      dealershipName
    });

    const savedOwner = await newOwner.save();
    res.status(201).json(savedOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete owner
router.delete('/owners/:id', async (req, res) => {
  try {
    const owner = await Owner.findByIdAndDelete(req.params.id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.json({ message: 'Owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update owner
router.put('/owners/:id', async (req, res) => {
  try {
    const { name, phone, city, dealershipName } = req.body;
    
    const updatedOwner = await Owner.findByIdAndUpdate(
      req.params.id,
      { name, phone, city, dealershipName },
      { new: true, runValidators: true }
    );

    if (!updatedOwner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    res.json(updatedOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;