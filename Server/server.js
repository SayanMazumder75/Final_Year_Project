const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload'); // to upload files

// CORS configuration to allow requests from frontend and credentials
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true // allow cookies
}));

// Middlewares
app.use(express.json({ limit: '10mb' }));  // increase JSON limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); // handle form data

app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  limits: { fileSize: 10 * 1024 * 1024 } // limit file uploads to 10 MB
}));

// Routes
app.use('/user', require('./Routes/userRoutes'));       // user routes
app.use('/owner', require('./Routes/ownerRoutes'));     // owner routes
app.use('/api', require('./Routes/categoryRoutes'));    // category routes
app.use('/api', require('./Routes/upload'));            // upload routes
app.use('/api', require('./Routes/productRouter'));     // product routes

// Test endpoint
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// MongoDB connection
const URI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});