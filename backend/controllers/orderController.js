const Order = require('../models/Order');
const Cart = require('../models/cart');
const sendOrderEmail = require('../utils/sendEmail');

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

    const totalPrice = items.reduce((s, it) => s + it.qty * it.price, 0);
    const order = await Order.create({ user: userId, items, totalPrice, orderDate: new Date() });

    if (userId) await Cart.findOneAndDelete({ user: userId });

    // send email (best-effort)
    try {
      const user = req.user ? { email: req.user.email, name: req.user.name } : { email: req.body.email };
      if (user?.email) await sendOrderEmail(order, user);
    } catch (emailErr) {
      console.error('Failed to send order email:', emailErr);
    }

    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

