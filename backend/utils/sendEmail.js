const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // you can switch to other providers
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * sendOrderEmail(order, user)
 * user: { email, name? }
 */
module.exports = async (order, user) => {
  const itemsHtml = order.items.map(i => `<li>${i.name} (${i.size}) x${i.qty} - ₹${i.price}</li>`).join('');
  const html = `
    <h2>Thank you for your order!</h2>
    <p>Order ID: <strong>${order._id}</strong></p>
    <p>Date: ${new Date(order.orderDate).toLocaleString()}</p>
    <h3>Items</h3>
    <ul>${itemsHtml}</ul>
    <h3>Total: ₹${order.totalPrice}</h3>
    <p>We will notify you about shipping updates. Cheers!</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmation - #${order._id}`,
    html
  };

  return transporter.sendMail(mailOptions);
};
