const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  firstName: String,
  lastName: String,
  email: String,
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
