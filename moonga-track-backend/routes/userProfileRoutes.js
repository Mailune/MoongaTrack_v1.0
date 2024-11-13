const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  addAnimeToWatchlist,
  getUserWatchlist,
  addAnimeToFavorites,
  removeAnimeFromWatchlist,
  removeAnimeFromFavorites
} = require('../controllers/userProfileController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes pour le profil utilisateur
router.get('/profile', requireAuth, getUserProfile);
router.put('/profile', requireAuth, updateUserProfile);

// Routes pour la liste de suivi
router.post('/watchlist', requireAuth, addAnimeToWatchlist);
router.get('/watchlist', requireAuth, getUserWatchlist);
router.delete('/watchlist', requireAuth, removeAnimeFromWatchlist);

// Routes pour les favoris
router.post('/favorites', requireAuth, addAnimeToFavorites);
router.delete('/favorites', requireAuth, removeAnimeFromFavorites);

module.exports = router;
