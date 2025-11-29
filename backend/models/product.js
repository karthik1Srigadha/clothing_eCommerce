const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  sizes: [String],
  category: String,
  description: String
});

module.exports = mongoose.model("Product", productSchema);
