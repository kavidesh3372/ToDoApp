import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/database.js';
import todoRoutes from './src/routes/todos.js';

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

console.log('Port:', PORT);

// Middleware
  app.use(cors({
      origin: 'http://localhost:3000' // Replace with your React app's origin
    }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/todos', todoRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Todo API is running!',
    version: '1.0.0'
  });
});

// Handle 404 - FIXED: Remove the asterisk parameter
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : error
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});