require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

// ----- Middlewares -----
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://clothing-e-commerce-six.vercel.app"   // your frontend domain
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Required for cross-site cookies 🚀
app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ----- Routes -----
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Health Check
app.get("/", (req, res) => res.send("Backend running..."));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
