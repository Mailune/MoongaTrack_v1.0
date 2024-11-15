require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Import routes
const userRoutes = require('./routes/userRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const animeRoutes = require('./routes/animeRoutes');
const mangaRoutes = require('./routes/mangaRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Import middleware
const { checkUser, requireAuth } = require('./middleware/authMiddleware');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// MongoDB connection event listeners
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

// Middleware setup
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use(checkUser); // Apply globally to check JWT tokens

// API Routes
app.use('/api/auth', userRoutes);
app.use('/api/user', userProfileRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/animes', animeRoutes);
app.use('/api/mangas', mangaRoutes);
app.use('/api/search', searchRoutes);

// Protected route example
app.get('/api/protected', requireAuth, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed successfully.' });
});

// Start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
