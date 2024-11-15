const User = require('../models/User');
const { fetchFromAniList, personalizedRecommendationQuery } = require('../services/aniListService');

/**
 * Get personalized recommendations for a user based on their preferences
 */
exports.getPersonalizedRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { favoriteGenres, favoriteThemes } = user.preferences || {};
    if (!favoriteGenres || !favoriteThemes) {
      return res.status(400).json({ error: 'User preferences are required to generate recommendations' });
    }

    // Fetch personalized recommendations from AniList API
    const recommendations = await fetchFromAniList(personalizedRecommendationQuery, {
      genres: favoriteGenres,
      themes: favoriteThemes,
      page: 1,
      perPage: 10,
    });

    res.status(200).json({ recommendations });
  } catch (error) {
    console.error("Error fetching personalized recommendations:", error.message);
    res.status(500).json({ error: 'Error occurred while fetching recommendations' });
  }
};