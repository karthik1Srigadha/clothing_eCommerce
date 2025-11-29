// Run once: node seedProducts.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');
const connectDB = require('./config/db');

const products = [
  { name: 'Classic White T-Shirt', description: 'Cotton tee', price: 499, image: 'https://picsum.photos/seed/1/400/400', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Blue Denim Jeans', description: 'Slim fit denim', price: 1499, image: 'https://picsum.photos/seed/2/400/400', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Red Hoodie', description: 'Warm fleece hoodie', price: 999, image: 'https://picsum.photos/seed/3/400/400', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Floral Summer Dress', description: 'Light & breezy', price: 1299, image: 'https://picsum.photos/seed/4/400/400', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Kids Striped T-Shirt', description: 'Fun stripes', price: 399, image: 'https://picsum.photos/seed/5/400/400', category: 'Kids', sizes: ['S','M'] },
  { name: 'Leather Jacket', description: 'Premium faux leather', price: 4999, image: 'https://picsum.photos/seed/6/400/400', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Chino Pants', description: 'Comfort fit', price: 1199, image: 'https://picsum.photos/seed/7/400/400', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Black Leggings', description: 'Stretchable', price: 699, image: 'https://picsum.photos/seed/8/400/400', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Summer Hat', description: 'Straw hat', price: 299, image: 'https://picsum.photos/seed/9/400/400', category: 'Women', sizes: ['One Size'] },
  { name: 'Running Shoes', description: 'Lightweight', price: 2499, image: 'https://picsum.photos/seed/10/400/400', category: 'Men', sizes: ['8','9','10'] },
  { name: 'Denim Jacket', description: 'Casual style', price: 1999, image: 'https://picsum.photos/seed/11/400/400', category: 'Women', sizes: ['M','L'] },
  { name: 'Polo Shirt', description: 'Breathable fabric', price: 699, image: 'https://picsum.photos/seed/12/400/400', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Kids Jeans', description: 'Durable', price: 799, image: 'https://picsum.photos/seed/13/400/400', category: 'Kids', sizes: ['S','M'] },
  { name: 'Athletic Shorts', description: 'Quick-dry', price: 499, image: 'https://picsum.photos/seed/14/400/400', category: 'Men', sizes: ['M','L'] },
  { name: 'Evening Gown', description: 'Elegant formal wear', price: 5999, image: 'https://picsum.photos/seed/15/400/400', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Cargo Pants', description: 'Multiple pockets', price: 1399, image: 'https://picsum.photos/seed/16/400/400', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Sports Cap', description: 'Adjustable', price: 249, image: 'https://picsum.photos/seed/17/400/400', category: 'Kids', sizes: ['One Size'] },
  { name: 'Winter Coat', description: 'Insulated coat', price: 3499, image: 'https://picsum.photos/seed/18/400/400', category: 'Women', sizes: ['M','L','XL'] },
  { name: 'Graphic Tee', description: 'Printed design', price: 599, image: 'https://picsum.photos/seed/19/400/400', category: 'Men', sizes: ['S','M','L'] },
  { name: 'Denim Skirt', description: 'Button front', price: 899, image: 'https://picsum.photos/seed/20/400/400', category: 'Women', sizes: ['S','M'] }
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products');
    process.exit();
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
};

seed();
