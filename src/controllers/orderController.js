const Order = require('../models/orderModel');

// CREATE
exports.createOrder = async (req, res) => {
  try {
    const { orderId, quantity, total, discountPercent, discount, deliveryConfirmed } = req.body;

    if (!deliveryConfirmed) {
      return res.status(400).json({ message: "Order can't be created until delivery is confirmed." });
    }

    let discountAmount = 0;

    if (discountPercent) {
      discountAmount = (total * discountPercent) / 100;
    } else if (discount) {
      discountAmount = discount;
    }

    const finalAmount = total - discountAmount;

    const newOrder = new Order({
      orderId,
      quantity,
      total,
      discount: discountAmount,
      discountPercent: discountPercent || 0,
      finalAmount,
      deliveryConfirmed
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateOrder = async (req, res) => {
  try {
    const { quantity, total, discountPercent, discount, deliveryConfirmed } = req.body;

    let discountAmount = 0;
    if (discountPercent) {
      discountAmount = (total * discountPercent) / 100;
    } else if (discount) {
      discountAmount = discount;
    }

    const finalAmount = total - discountAmount;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      {
        quantity,
        total,
        discount: discountAmount,
        discountPercent: discountPercent || 0,
        finalAmount,
        deliveryConfirmed
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};