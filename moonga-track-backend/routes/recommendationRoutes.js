const express = require('express');
const { getPersonalizedRecommendations } = require('../controllers/recommendationController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * Route to fetch personalized recommendations for the authenticated user
 */
router.get('/', requireAuth, getPersonalizedRecommendations);

module.exports = router;