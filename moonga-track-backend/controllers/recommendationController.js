const { fetchFromAniList, recommendationQuery } = require('../services/aniListService');

exports.getRecommendations = async (req, res) => {
  const { genre } = req.query;
  try {
    const data = await fetchFromAniList(recommendationQuery, { genre });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des recommandations.' });
  }
};
