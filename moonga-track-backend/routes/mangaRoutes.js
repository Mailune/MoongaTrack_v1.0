const express = require('express');
const { searchManga } = require('../controllers/mangaController');
const router = express.Router();

// Route de recherche de manga
router.get('/search', searchManga);

module.exports = router;
