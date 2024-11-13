const express = require('express');
const { getMangaList } = require('../controllers/mangaController');
const router = express.Router();

// Route pour obtenir la liste des mangas et les enregistrer en base de données
router.get('/mangas', getMangaList);

module.exports = router;
