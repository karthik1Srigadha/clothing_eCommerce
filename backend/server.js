require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const allowedOrigins = [
  "http://localhost:5173",
  "https://clothing-e-commerce-six.vercel.app"
];

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));





app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));



// Simple health-check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/', (req, res) => {
  res.send('Backend is running...');
});


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

