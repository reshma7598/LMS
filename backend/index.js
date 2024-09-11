const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Lib')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 7000');
});