const express = require('express');
const { searchContent } = require('../controllers/searchController');
const router = express.Router();

// Route pour la recherche de contenu
router.get('/', searchContent);

module.exports = router;
