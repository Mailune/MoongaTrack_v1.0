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

/**
 * User Profile Routes
 */
router.get('/profile', requireAuth, getUserProfile);
router.put('/profile', requireAuth, updateUserProfile);

/**
 * Watchlist Routes
 */
router.post('/watchlist', requireAuth, addAnimeToWatchlist);
router.get('/watchlist', requireAuth, getUserWatchlist);
router.delete('/watchlist', requireAuth, removeAnimeFromWatchlist);

/**
 * Favorites Routes
 */
router.post('/favorites', requireAuth, addAnimeToFavorites);
router.delete('/favorites', requireAuth, removeAnimeFromFavorites);

module.exports = router;