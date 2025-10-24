const mongoose = require('mongoose');

const ownerProfileSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  shopName: { type: String, required: true },
  businessRegId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  shopAddress: { type: String, required: true },
  pinCode: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String},
}, { timestamps: true });

module.exports = mongoose.model('OwnerProfile', ownerProfileSchema);
