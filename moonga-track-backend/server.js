const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { checkUser, requireAuth } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
connectDB();

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000', // URL du frontend
    credentials: true, // Autoriser les cookies dans CORS
}));
app.use(express.json());
app.use(cookieParser());

// Appliquez `checkUser` globalement pour vérifier le JWT sur toutes les routes
app.use(checkUser);

// Routes API pour l'authentification
app.use('/api/auth', userRoutes);

// Route protégée pour test (exemple)
app.get('/api/protected', requireAuth, (req, res) => {
    res.status(200).json({ message: "Accès à la route protégée autorisé" });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
