const express = require('express');
const { getAnimeList } = require('../controllers/animeController');
const router = express.Router();

// Route pour obtenir la liste des animes et les enregistrer en base de données
router.get('/animes', getAnimeList);

module.exports = router;
