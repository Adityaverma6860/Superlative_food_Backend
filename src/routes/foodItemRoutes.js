const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {createFoodItem,getAllFoodItems,getFoodItemById,updateFoodItem,deleteFoodItem} = require("../controllers/foodItemController");

router.post("/", upload.single("image"),createFoodItem);

router.get("/",getAllFoodItems);

router.get("/:id",getFoodItemById);

router.put("/:id", upload.single("image"),updateFoodItem);

router.delete("/:id",deleteFoodItem);

module.exports = router;
