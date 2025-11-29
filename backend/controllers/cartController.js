const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.json({ items: [] });
    const cart = await Cart.findOne({ user: userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId, size, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const price = product.price;
    if (!userId) return res.status(401).json({ message: 'Login to persist cart' });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [] });

    const existingIndex = cart.items.findIndex(i => i.product.equals(product._id) && i.size === size);
    if (existingIndex > -1) {
      cart.items[existingIndex].qty += qty;
    } else {
      cart.items.push({ product: product._id, name: product.name, size, qty, price });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.mergeCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const guestItems = req.body.items || [];
    if (!userId) return res.status(401).json({ message: 'Not authorized' });

    let cart = await Cart.findOne({ user: userId }) || new Cart({ user: userId, items: [] });

    for (const it of guestItems) {
      const product = await Product.findById(it.productId);
      if (!product) continue;
      const existingIndex = cart.items.findIndex(i => i.product.equals(product._id) && i.size === it.size);
      if (existingIndex > -1) cart.items[existingIndex].qty += it.qty;
      else cart.items.push({ product: product._id, name: product.name, size: it.size, qty: it.qty, price: product.price });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateQty = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, qty } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.json({ items: [] });

    const item = cart.items.find(i => i.product.equals(productId) && i.size === size);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter(
      i => !(i.product.equals(productId) && i.size === size)
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
