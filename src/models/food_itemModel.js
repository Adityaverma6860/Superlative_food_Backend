// // models/FoodItem.js
// const mongoose = require('mongoose');

// const foodItemSchema = new mongoose.Schema({
//   _id: {
//     type: String,
//     required: true
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   image: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   category: {
//     type: String,
//     required: true,
//     trim: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('FoodItem', foodItemSchema);

const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
module.exports = foodModel;
