// routes/recommendationRoutes.js
const express = require('express');
const { getPersonalizedRecommendations } = require('../controllers/recommendationController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Route pour obtenir des recommandations personnalisées
router.get('/', requireAuth, getPersonalizedRecommendations);

module.exports = router;
