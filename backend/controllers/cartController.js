const Cart = require('../models/cart');
const Product = require('../models/product');

// ====================== GET CART ======================
exports.getCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.json({ items: [] });

    const cart = await Cart.findOne({ user: userId });
    return res.json(cart || { items: [] });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// ====================== ADD TO CART ======================
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId, size, qty } = req.body;

    if (!userId) return res.status(401).json({ message: "Login required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const index = cart.items.findIndex(
      i => i.product.toString() === productId && i.size === size
    );

    if (index > -1) cart.items[index].qty += qty;
    else cart.items.push({
      product: product._id,
      name: product.name,
      size,
      qty,
      price: product.price
    });

    await cart.save();
    return res.json(cart);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// ====================== MERGE GUEST CART AFTER LOGIN ======================
exports.mergeCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const guestItems = req.body.items || [];

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    for (const g of guestItems) {
      const product = await Product.findById(g.productId);
      if (!product) continue;

      const index = cart.items.findIndex(
        i => i.product.toString() === g.productId && i.size === g.size
      );

      if (index > -1) cart.items[index].qty += g.qty;
      else cart.items.push({
        product: product._id,
        name: product.name,
        size: g.size,
        qty: g.qty,
        price: product.price
      });
    }

    await cart.save();
    return res.json(cart);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// ====================== UPDATE CART ITEM QTY ======================
exports.updateQty = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId, size, qty } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.json({ items: [] });

    const item = cart.items.find(
      i => i.product.toString() === productId && i.size === size
    );

    if (!item) return res.status(404).json({ message: "Item not found" });
    item.qty = qty;

    await cart.save();
    return res.json(cart);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// ====================== REMOVE ITEM ======================
exports.removeItem = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId, size } = req.query;  // <--- FIXED HERE

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter(
      i => !(i.product.toString() === productId && i.size === size)
    );

    await cart.save();
    return res.json(cart);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
