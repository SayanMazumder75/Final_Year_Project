const express = require('express');
const mongoose = require('mongoose'); // Add this missing import
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
require('dotenv').config();

// CORS configuration - FIXED (remove duplicate cors calls)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // both frontend ports
  credentials: true
}));

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
}));

// Connect to MongoDB
connectDB();

// Routes
app.use('/user', require('./Routes/userRoutes'));
app.use('/owner', require('./Routes/ownerRoutes'));
app.use('/api', require('./Routes/categoryRoutes'));
app.use('/api', require('./Routes/upload'));
app.use('/api', require('./Routes/productRouter'));
app.use('/api/rental', require('./Routes/rentalRoutes'));
app.use('/api/buyer', require('./Routes/buyRoutes'));

// Test endpoint
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Start server - REMOVE DUPLICATE
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});