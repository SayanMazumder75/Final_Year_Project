const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload'); // for file uploads
const connectDB = require('./config/db'); // CommonJS import
require('dotenv').config();

<<<<<<< Updated upstream
// CORS configuration to allow requests from frontend and credentials
// app.use(cors({
//   origin: 'http://localhost:5173', // frontend URL
//   credentials: true // allow cookies
// }));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // both ports
=======
// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// // MongoDB connection
// const URI = process.env.MONGO_URI;
// const connectDB = async () => {
//   try {
//     await mongoose.connect(URI);
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// };
// connectDB();
// MongoDB connection
const URI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
    
    // 🔥 ADD THE FIX HERE 🔥
    const db = mongoose.connection.db;
    try {
      // Drop the problematic email index if it exists
      await db.collection('owners').dropIndex('email_1');
      console.log('✅ Fixed duplicate email index');
    } catch (error) {
      console.log('ℹ️ Email index already removed or not present');
    }
    // 🔥 END OF FIX 🔥
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
connectDB();

=======
>>>>>>> Stashed changes
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
<<<<<<< Updated upstream

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
=======
>>>>>>> Stashed changes
