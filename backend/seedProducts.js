// Run once: node seedProducts.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');
const connectDB = require('./config/db');

const products = [
  { name: 'Classic White T-Shirt', description: 'Cotton tee', price: 499, image: 'https://img.freepik.com/premium-photo/clean-classic-white-tshirt-mockup-your-timeless-designs_1043846-1718.jpg', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Blue Denim Jeans', description: 'Slim fit denim', price: 1499, image: 'https://www.styledbysally.com.au/wp-content/uploads/2018/01/Classic-Blue-Men-Jeans-Pant-Cotton-Slim-Fit-Men-s-Denim-Pants-Stretch-Fashion-Mens-Clothes.jpg', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Red Hoodie', description: 'Warm fleece hoodie', price: 999, image: 'https://images-na.ssl-images-amazon.com/images/I/617MCb-JrvL._AC_UY741_.jpg', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Floral Summer Dress', description: 'Light & breezy', price: 1299, image: 'https://images.edressit.com/ProductImages/420x633/201909/e897295b-3e23-4089-8236-4f96f3fbf349.jpg', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Kids Striped T-Shirt', description: 'Fun stripes', price: 399, image: 'https://image.hm.com/assets/hm/b2/b6/b2b6476124fb09b6334b3be2161381a062eb44e9.jpg?imwidth=2160', category: 'Kids', sizes: ['S','M'] },
  { name: 'Leather Jacket', description: 'Premium faux leather', price: 4999, image: 'https://leatherskinshop.com/cdn/shop/articles/leather-jacket-outfits-men_2000x.jpg?v=1703195148', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Chino Pants', description: 'Comfort fit', price: 1199, image: 'https://cdn-s3.touchofmodern.com/products/002/562/383/c927e2183b45efcdc0fd668dd362ea4a_large.jpg?1670888439', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Black Leggings', description: 'Stretchable', price: 699, image: 'https://images.lululemon.com/is/image/lululemon/LW5FG6S_051757_1', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Summer Hat', description: 'Straw hat', price: 299, image: 'https://m.media-amazon.com/images/I/81POkn1EQNL._AC_SL1500_.jpg', category: 'Women', sizes: ['One Size'] },
  { name: 'Running Shoes', description: 'Lightweight', price: 2499, image: 'https://static.nike.com/a/images/t_prod/w_1920,c_limit,f_auto,q_auto/e0ae2237-0739-4794-b0ce-61ffadf09477/pdp.jpg', category: 'Men', sizes: ['8','9','10'] },
  { name: 'Denim Jacket', description: 'Casual style', price: 1999, image: 'https://www.collegefashion.net/wp-content/uploads/2019/01/urban-outfitters-denim-jacketjpeg.jpg', category: 'Women', sizes: ['M','L'] },
  { name: 'Polo Shirt', description: 'Breathable fabric', price: 699, image: 'https://cdna.lystit.com/photos/b863-2015/04/28/ralph-lauren-newport-navy-custom-fit-big-pony-mesh-polo-shirt-slim-fit-blue-product-0-395223378-normal.jpeg', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Kids Jeans', description: 'Durable', price: 799, image: 'https://www.gap.com/webcontent/0057/080/574/cn57080574.jpg', category: 'Kids', sizes: ['S','M'] },
  { name: 'Athletic Shorts', description: 'Quick-dry', price: 499, image: 'https://runningshorts.com/wp-content/uploads/2023/10/15-unbelievable-mens-athletic-shorts-with-no-pockets-for-2023-1698331616.jpg', category: 'Men', sizes: ['M','L'] },
  { name: 'Evening Gown', description: 'Elegant formal wear', price: 5999, image: 'https://s5.weddbook.com/t4/2/0/4/2043177/new-long-purple-applique-formal-party-evening-prom-cocktail-dresses-wedding-gown.jpg', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Cargo Pants', description: 'Multiple pockets', price: 1399, image: 'https://cdn.shopify.com/s/files/1/0267/0323/3076/products/suzhoucargopantst81007pic5_1200x1200.jpg?v=1614415711', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Sports Cap', description: 'Adjustable', price: 249, image: 'https://www.promotionproducts.com.au/media/products/images/sports-caps/Sports-Caps_black-and-white.jpg', category: 'Kids', sizes: ['One Size'] },
  { name: 'Winter Coat', description: 'Insulated coat', price: 3499, image: 'https://s.yimg.com/ny/api/res/1.2/qSUhdq4khEVy5MwOCjxUsg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD0xNDYx/https://media.zenfs.com/en/aol_purewow_824/1795eb80256f9ba8f85837dad935a309', category: 'Women', sizes: ['M','L','XL'] },
  { name: 'Graphic Tee', description: 'Printed design', price: 599, image: 'https://i5.walmartimages.com/seo/Men-s-Overflow-Graphic-Tees-for-Men-S-4XL_79dd3134-5689-42c6-a520-a606199e42ea.d105831f4ff8f53ee7cd67f6c7778d9e.jpeg', category: 'Men', sizes: ['S','M','L'] },
  { name: 'Denim Skirt', description: 'Button front', price: 899, image: 'https://i.pinimg.com/originals/d6/08/b1/d608b1c5f1bbf21c5d38b4f18ae9158f.jpg', category: 'Women', sizes: ['S','M'] }
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
