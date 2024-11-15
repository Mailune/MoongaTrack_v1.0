const express = require('express');
const { getMangaList } = require('../controllers/mangaController');
const router = express.Router();

/**
 * Route to fetch the manga list from AniList API and save to the database
 */
router.get('/', getMangaList);

module.exports = router;