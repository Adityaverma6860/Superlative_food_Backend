const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const foodItemController = require("../controllers/foodItemController");

router.post("/", upload.single("image"), foodItemController.createFoodItem);

router.get("/", foodItemController.getAllFoodItems);

router.get("/:id", foodItemController.getFoodItemById);

router.put("/:id", upload.single("image"), foodItemController.updateFoodItem);

router.delete("/:id", foodItemController.deleteFoodItem);

module.exports = router;
