const router = require('express').Router();
const { protect } = require('../middleware/auth');
const { getCart, addToCart, mergeCart, updateQty, removeItem } = require('../controllers/cartController');

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.post('/merge', protect, mergeCart);

// NEW ROUTES
router.put('/update', protect, updateQty);
router.delete('/remove', protect, removeItem);

module.exports = router;
