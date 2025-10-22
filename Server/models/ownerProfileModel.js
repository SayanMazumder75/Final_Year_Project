// const mongoose = require('mongoose');

// const ownerProfileSchema = new mongoose.Schema({
//   ownerName: { type: String, required: true },
//   shopName: { type: String, required: true },
//   businessRegId: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   contactNumber: { type: String, required: true },
//   shopAddress: { type: String, required: true },
//   pinCode: { type: String, required: true },
//   password: { type: String, required: true },
//   profilePic: { type: String, default: "", required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('OwnerProfile', ownerProfileSchema);
// backend/models/Owner.js
// Models/OwnerModel.js
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