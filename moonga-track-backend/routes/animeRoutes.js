const express = require('express');
const { getAnimeList } = require('../controllers/animeController');
const router = express.Router();

/**
 * Route to fetch the anime list from AniList API and save to the database
 */
router.get('/', getAnimeList);

module.exports = router;
