const Delivery = require('../models/deliveryModel');

// exports.createDelivery = async (req, res) => {
//   try {
//     const delivery = await Delivery.create({ ...req.body, userId: req.user._id });
//     res.status(201).json(delivery);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

exports.createDelivery = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipCode,
      country,
      phone
    } = req.body;

    const delivery = await Delivery.create({
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipCode,
      country,
      phone,
      userId: req.user._id,  // Automatically link to logged-in user
    });

    res.status(201).json(delivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getUserDeliveries = async (req, res) => {
  const deliveries = await Delivery.find({ userId: req.user._id });
  res.json(deliveries);
};

exports.getAllDeliveries = async (req, res) => {
  const deliveries = await Delivery.find();
  res.json(deliveries);
};

// exports.updateDelivery = async (req, res) => {
//   const delivery = await Delivery.findById(req.params.id);

//   if (!delivery) return res.status(404).json({ message: 'Not found' });

//   if (req.user.role !== 'admin' && delivery.userId.toString() !== req.user._id.toString()) {
//     return res.status(403).json({ message: 'Unauthorized' });
//   }

//   Object.assign(delivery, req.body);
//   await delivery.save();
//   res.json(delivery);
// };const Delivery = require('../models/Delivery');

exports.updateDelivery = async (req, res) => {
  try {
    const deliveryId = req.params.id;

    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipCode,
      country,
      phone
    } = req.body;

    // Find the delivery record
    const delivery = await Delivery.findById(deliveryId);

    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    // If the user is not admin and not the owner, block the update
    if (req.user.role !== 'admin' && delivery.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this delivery' });
    }
    // Update fields
    delivery.firstName = firstName || delivery.firstName;
    delivery.lastName = lastName || delivery.lastName;
    delivery.email = email || delivery.email;
    delivery.street = street || delivery.street;
    delivery.city = city || delivery.city;
    delivery.state = state || delivery.state;
    delivery.zipCode = zipCode || delivery.zipCode;
    delivery.country = country || delivery.country;
    delivery.phone = phone || delivery.phone;

    const updatedDelivery = await delivery.save();

    res.status(200).json(updatedDelivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteDelivery = async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);

  if (!delivery) return res.status(404).json({ message: 'Not found' });

  if (req.user.role !== 'admin' && delivery.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  await delivery.remove();
  res.json({ message: 'Deleted successfully' });
};
