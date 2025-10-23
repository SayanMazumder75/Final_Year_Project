const mongoose = require('mongoose');

const CarBuySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    car: { type: String, required: true },
    color: { type: String, required: true },
    priceRange: { type: String, required: true },
    address: { type: String, required: true },
    payment: { type: String, required: true },
    testDrive: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Buyer', CarBuySchema);
