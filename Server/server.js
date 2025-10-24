// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const PORT = process.env.PORT || 5000;
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const fileUpload = require('express-fileupload');
// const connectDB = require('./config/db');
// require('dotenv').config();

// // Add path here
// const path = require('path');

// // CORS configuration
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:5174'],
//   credentials: true
// }));

// // Middlewares
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use(cookieParser());
// app.use(fileUpload({
//   useTempFiles: true,
//   limits: { fileSize: 10 * 1024 * 1024 }
// }));

// // **Serve uploaded files**
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB
// connectDB();

// // Routes
// app.use('/user', require('./Routes/userRoutes'));
// app.use('/owner', require('./Routes/ownerRoutes'));
// app.use('/api', require('./Routes/categoryRoutes'));
// app.use('/api', require('./Routes/upload'));
// app.use('/api', require('./Routes/productRouter'));
// app.use('/api/rental', require('./Routes/rentalRoutes'));
// app.use('/api/buyer', require('./Routes/buyRoutes'));

// // Test endpoint
// app.get('/', (req, res) => {
//   res.send('Hello from the server!');
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
require('dotenv').config();
const path = require('path');
const fs = require('fs'); // <-- add fs

// -----------------------------
// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads folder created');
}
// -----------------------------

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  limits: { fileSize: 10 * 1024 * 1024 }
}));

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
