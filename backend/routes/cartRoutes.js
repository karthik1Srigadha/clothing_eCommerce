const router = require('express').Router();
const { protect } = require('../middleware/auth');
const { getCart, addToCart, mergeCart } = require('../controllers/cartController');

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.post('/merge', protect, mergeCart);

module.exports = router;
