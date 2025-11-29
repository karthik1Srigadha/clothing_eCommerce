const router = require('express').Router();
const { createOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrder);

module.exports = router;
