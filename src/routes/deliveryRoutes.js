const express = require('express');
const router = express.Router();
const {
  createDelivery,
  getUserDeliveries,
  getAllDeliveries,
  updateDelivery,
  deleteDelivery
} = require('../controllers/deliveryController');

const { allowRoles } = require('../middleware/roleRoutes');
const {jwtAuthMiddleware} = require('../middleware/jwtAuth');

// User routes
// router.post('/',  createDelivery);
// router.get('/my',  getUserDeliveries);
router.post('/', jwtAuthMiddleware, createDelivery);
router.get('/', jwtAuthMiddleware, getUserDeliveries);

// Admin route
router.get('/a', jwtAuthMiddleware,allowRoles('admin'), getAllDeliveries);


// router.get('/', protect, allowRoles('admin','user'),getAllDeliveries);


// Both can update/delete their own delivery
router.put('/:id',jwtAuthMiddleware, updateDelivery);
router.delete('/:id',jwtAuthMiddleware, deleteDelivery);

module.exports = router;
