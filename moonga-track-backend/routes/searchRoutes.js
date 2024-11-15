const express = require('express');
const { searchContent } = require('../controllers/searchController');
const router = express.Router();

/**
 * Route to search for anime or manga content from AniList API
 */
router.get('/', searchContent);

module.exports = router;