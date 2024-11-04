const express = require('express');
const { searchAnime } = require('../controllers/animeController');
const router = express.Router();

// Route de recherche d'anime
router.get('/search', searchAnime);

module.exports = router;
