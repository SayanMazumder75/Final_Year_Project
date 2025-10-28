const mongoose = require('mongoose');

const CarRentalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    car: { type: String, required: true },
    pickupDate: { type: String, required: true },
    dropoffDate: { type: String, required: true },
    pickupTime: { type: String, required: true },
    payment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CarRental', CarRentalSchema);
