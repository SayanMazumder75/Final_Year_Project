// Server/Models/OwnerModel.js
const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true
  },
  phone: {
    type: String,
    default: "+91 "
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  dealershipName: {
    type: String,
    required: [true, 'Dealership name is required'],
    trim: true,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Owner', ownerSchema);