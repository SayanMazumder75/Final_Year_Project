// models/ownerProfileModel.js
const mongoose = require('mongoose');

const ownerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    unique: true
  },
  shopName: {
    type: String,
    required: true
  },
  businessRegId: {
    type: String,
    required: true
  },
  gstNumber: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('OwnerProfile', ownerProfileSchema);
