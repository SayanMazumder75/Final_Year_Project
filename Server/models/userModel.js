const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  pincode: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  userType: {
    type: String,
    enum: ['user', 'owner'], // same route logic stays
    default: 'user',
  },
},
{ timestamps: true }
);

module.exports = mongoose.model('Users', userSchema);
