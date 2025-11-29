// backend/controllers/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/cart');
const sendOrderEmail = require('../utils/sendEmail');

/**
 * createOrder(req, res)
 * - supports:
 *    - logged-in user: if no items in body, it will take items from user's cart
 *    - guest checkout: items + email provided in body
 */
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    let items = req.body.items || [];

    // if logged-in and no items provided, take items from user's cart
    if (userId && (!items || items.length === 0)) {
      const cart = await Cart.findOne({ user: userId });
      if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });
      items = cart.items.map(i => ({ product: i.product, name: i.name, size: i.size, qty: i.qty, price: i.price }));
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items provided for order' });
    }

    // compute totalPrice
    const totalPrice = items.reduce((s, it) => s + (it.qty || 0) * (it.price || 0), 0);

    // create order (orderDate default will be set by model)
    const order = await Order.create({ user: userId, items, totalPrice, orderDate: new Date() });

    // clear user's cart if logged-in
    if (userId) await Cart.findOneAndDelete({ user: userId });

    // send confirmation email (best-effort)
    try {
      const user = req.user ? { email: req.user.email, name: req.user.name } : { email: req.body.email, name: req.body.name };
      if (user?.email) {
        await sendOrderEmail(order, user);
      } else {
        console.warn('No email available to send order confirmation.');
      }
    } catch (emailErr) {
      console.error('Failed to send order email:', emailErr);
    }

    return res.status(201).json({ order });
  } catch (err) {
    console.error('createOrder error', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

/**
 * getOrderById(req, res)
 * - returns the order if the requesting user is the owner (or if you want admin access, expand)
 */
exports.getOrderById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const orderId = req.params.id;
    if (!orderId) return res.status(400).json({ message: 'Order id required' });

    const order = await Order.findById(orderId).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // allow only owner to view order (basic security)
    if (order.user && userId && order.user._id.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    return res.json({ order });
  } catch (err) {
    console.error('getOrderById error', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};
