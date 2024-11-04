const express = require('express');
const { getRecommendations } = require('../controllers/recommendationController');
const router = express.Router();

// Route pour obtenir des recommandations
router.get('/', getRecommendations);

module.exports = router;
