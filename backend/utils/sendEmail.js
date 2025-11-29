// backend/utils/sendEmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // change provider if needed (SendGrid, Mailgun, etc)
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
  const itemsHtml = (order.items || []).map(i =>
    `<li style="margin-bottom:6px">
       <strong>${i.name}</strong> (${i.size}) x${i.qty} — ₹${i.price} each — Subtotal: ₹${(i.qty * i.price).toFixed(2)}
     </li>`
  ).join('');

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111">
      <h2>Thank you for your order${user.name ? `, ${user.name}` : ''}!</h2>
      <p>Order ID: <strong>${order._id}</strong></p>
      <p>Date: ${new Date(order.orderDate).toLocaleString()}</p>

      <h3>Items</h3>
      <ul style="list-style: none; padding-left: 0;">${itemsHtml}</ul>

      <h3>Total: ₹${(order.totalPrice || 0).toFixed(2)}</h3>

      <p style="color:#555">We will notify you about shipping updates. If you have questions, reply to this email.</p>

      <hr style="border:none;border-top:1px solid #eee" />
      <p style="font-size:12px;color:#999">Pasovit — Order Confirmation</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmation — #${order._id}`,
    html
  };

  return transporter.sendMail(mailOptions);
};
