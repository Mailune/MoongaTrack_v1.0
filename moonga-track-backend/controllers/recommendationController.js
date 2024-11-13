const User = require('../models/User');
const { fetchFromAniList, personalizedRecommendationQuery } = require('../services/aniListService');

// Obtenir les recommandations personnalisées
exports.getPersonalizedRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    const { favoriteGenres, favoriteThemes } = user.preferences;
    if (!favoriteGenres || !favoriteThemes) {
      return res.status(400).json({ error: 'Les préférences utilisateur sont requises pour générer des recommandations' });
    }

    // Récupérer les recommandations depuis Anilist en fonction des préférences
    const recommendations = await fetchFromAniList(personalizedRecommendationQuery, {
      genres: favoriteGenres,
      themes: favoriteThemes,
      page: 1,
      perPage: 10
    });

    res.status(200).json({ recommendations });
  } catch (error) {
    console.error("Erreur lors de la récupération des recommandations personnalisées :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des recommandations." });
  }
};
