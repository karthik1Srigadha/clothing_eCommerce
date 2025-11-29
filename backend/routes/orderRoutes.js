// backend/routes/orderRoutes.js
const router = require('express').Router();
const { createOrder, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

// create order (protected for logged-in; still accepts guest orders with email)
router.post('/', protect, createOrder);

// fetch single order by id (protected so only owner can see)
router.get('/:id', protect, getOrderById);

module.exports = router;
