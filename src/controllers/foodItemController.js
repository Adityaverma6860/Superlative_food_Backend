
// const FoodItem = require("../models/food_itemModel");
// const uploadToCloudinary = require("../config/cloudinary");
// const { v4: uuidv4 } = require("uuid")

// exports.createFoodItem = async (req, res) => {
//   try {
//     const { name, price, description, category } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: "Image file is required." });
//     }

//     const cloudinaryResult = await uploadToCloudinary(req.file.path);

//     if (cloudinaryResult.error) {
//       return res.status(cloudinaryResult.status).json({ error: cloudinaryResult.error });
//     }

//     const newFoodItem = new FoodItem({
//       _id: uuidv4(),
//       name,
//       image: cloudinaryResult.secure_url,
//       price,
//       description,
//       category,
//     });

//     await newFoodItem.save();

//     res.status(201).json({ message: "Food item created successfully", data: newFoodItem });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.getAllFoodItems = async (req, res) => {
//   try {
//     const foodItems = await FoodItem.find();
//     res.status(200).json(foodItems);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch food items" });
//   }
// };

// exports.getFoodItemById = async (req, res) => {
//   try {
//     const foodItem = await FoodItem.findById(req.params.id);
//     if (!foodItem) return res.status(404).json({ error: "Food item not found" });

//     res.status(200).json(foodItem);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch food item" });
//   }
// };

// exports.deleteFoodItem = async (req, res) => {
//   try {
//     const deletedItem = await FoodItem.findByIdAndDelete(req.params.id);
//     if (!deletedItem) return res.status(404).json({ error: "Food item not found" });

//     res.status(200).json({ message: "Food item deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete food item" });
//   }
// };

// exports.updateFoodItem = async (req, res) => {
//   try {
//     const { name, price, description, category } = req.body;
//     let updateData = { name, price, description, category };

//     if (req.file) {
//       const cloudinaryResult = await uploadToCloudinary(req.file.path);

//       if (cloudinaryResult.error) {
//         return res.status(cloudinaryResult.status).json({ error: cloudinaryResult.error });
//       }

//       updateData.image = cloudinaryResult.secure_url;
//     }

//     const updatedItem = await FoodItem.findByIdAndUpdate(req.params.id, updateData, { new: true });

//     if (!updatedItem) return res.status(404).json({ error: "Food item not found" });

//     res.status(200).json({ message: "Food item updated successfully", data: updatedItem });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update food item" });
//   }
// };


const FoodItem = require("../models/food_itemModel");
const uploadToCloudinary = require("../config/cloudinary");

exports.createFoodItem = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const cloudinaryResult = await uploadToCloudinary(req.file.path);

    if (cloudinaryResult.error) {
      return res.status(cloudinaryResult.status).json({ error: cloudinaryResult.error });
    }

    const newFoodItem = new FoodItem({
      name,
      image: cloudinaryResult.secure_url,
      price,
      description,
      category,
    });

    await newFoodItem.save();

    res.status(201).json({ message: "Food item created successfully", data: newFoodItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};

exports.getFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem) return res.status(404).json({ error: "Food item not found" });

    res.status(200).json(foodItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch food item" });
  }
};

exports.deleteFoodItem = async (req, res) => {
  try {
    const deletedItem = await FoodItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Food item not found" });

    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete food item" });
  }
};

exports.updateFoodItem = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    let updateData = { name, price, description, category };

    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(req.file.path);

      if (cloudinaryResult.error) {
        return res.status(cloudinaryResult.status).json({ error: cloudinaryResult.error });
      }

      updateData.image = cloudinaryResult.secure_url;
    }

    const updatedItem = await FoodItem.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedItem) return res.status(404).json({ error: "Food item not found" });

    res.status(200).json({ message: "Food item updated successfully", data: updatedItem });
  } catch (err) {
    res.status(500).json({ error: "Failed to update food item" });
  }
};
