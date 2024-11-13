// Importation des modules nécessaires
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes'); // Routes de profil utilisateur, watchlist et favoris
const animeRoutes = require('./routes/animeRoutes');
const mangaRoutes = require('./routes/mangaRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const searchRoutes = require('./routes/searchRoutes'); // Route de recherche ajoutée
const { checkUser, requireAuth } = require('./middleware/authMiddleware');
require('dotenv').config();

// Initialisation de l'application Express
const app = express();

// Connexion à MongoDB
connectDB();

// Vérification de la connexion MongoDB et gestion des erreurs de connexion
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Utilisation de Helmet pour sécuriser Express
app.use(helmet());

// Configuration de CORS pour autoriser le frontend à accéder à l'API
app.use(cors({
    origin: 'http://localhost:3000', // URL du frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Autorisation des méthodes HTTP
    credentials: true, // Autorisation des cookies et des en-têtes d'autorisation
    allowedHeaders: ['Content-Type', 'Authorization'] // Autorisation des en-têtes nécessaires
}));

// Préconfiguration des options CORS pour toutes les routes
app.options('*', cors());

// Middleware pour analyser les requêtes JSON et les cookies
app.use(express.json());
app.use(cookieParser());

// Appliquez `checkUser` globalement pour vérifier le JWT sur toutes les routes
app.use(checkUser);

// Déclaration des routes API
// Routes API pour l'authentification
app.use('/api/auth', userRoutes);

// Route protégée pour test (exemple)
app.get('/api/protected', requireAuth, (req, res) => {
    res.status(200).json({ message: "Accès à la route protégée autorisé" });
});

// Utilisation des routes de profil utilisateur, liste de suivi et favoris
app.use('/api/user', userProfileRoutes);

// Utilisation de la route de recommandations
app.use('/api/recommendations', recommendationRoutes);

// Routes pour les animes, mangas, et la recherche
app.use('/api/animes', animeRoutes);
app.use('/api/mangas', mangaRoutes);
app.use('/api/search', searchRoutes); // Route de recherche ajoutée

// Démarrage du serveur sur le port spécifié dans les variables d'environnement ou sur le port 5005 par défaut
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
