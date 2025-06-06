const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  discount: { type: Number, default: 0 },           // ₹ discount
  discountPercent: { type: Number, default: 0 },     // Optional %
  finalAmount: { type: Number },
  deliveryConfirmed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);