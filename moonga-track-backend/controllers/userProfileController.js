const User = require('../models/User');

// Obtenir le profil de l'utilisateur
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour le profil utilisateur
exports.updateUserProfile = async (req, res) => {
  try {
    const { favoriteGenres, favoriteThemes } = req.body.preferences;
    const user = await User.findByIdAndUpdate(req.user.userId, {
      preferences: { favoriteGenres, favoriteThemes }
    }, { new: true });
    res.status(200).json({ message: 'Profil mis à jour avec succès', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un anime à la liste de suivi
exports.addAnimeToWatchlist = async (req, res) => {
  try {
    const { animeId, status, rating, comment } = req.body;
    const user = await User.findById(req.user.userId);

    // Vérifier si l'anime est déjà dans la liste de suivi
    const animeExists = user.animeList.find(item => item.animeId === animeId);
    if (animeExists) return res.status(400).json({ error: 'Cet anime est déjà dans la liste de suivi' });

    // Ajouter l'anime à la liste de suivi
    user.animeList.push({ animeId, status, rating, comment });
    await user.save();
    res.status(200).json({ message: 'Anime ajouté à la liste de suivi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un anime aux favoris
exports.addAnimeToFavorites = async (req, res) => {
  try {
    const { animeId } = req.body;
    const user = await User.findById(req.user.userId);

    // Vérifier si l'anime est déjà dans les favoris
    if (user.favorites.includes(animeId)) {
      return res.status(400).json({ error: 'Cet anime est déjà dans les favoris' });
    }

    // Ajouter l'anime aux favoris
    user.favorites.push(animeId);
    await user.save();
    res.status(200).json({ message: 'Anime ajouté aux favoris' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir la liste de suivi de l'utilisateur
exports.getUserWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json({ watchlist: user.animeList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un anime de la liste de suivi
exports.removeAnimeFromWatchlist = async (req, res) => {
  try {
    const { animeId } = req.body;
    const user = await User.findById(req.user.userId);

    // Supprimer l'anime de la liste de suivi
    user.animeList = user.animeList.filter(item => item.animeId !== animeId);
    await user.save();
    res.status(200).json({ message: 'Anime supprimé de la liste de suivi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un anime des favoris
exports.removeAnimeFromFavorites = async (req, res) => {
  try {
    const { animeId } = req.body;
    const user = await User.findById(req.user.userId);

    // Supprimer l'anime des favoris
    user.favorites = user.favorites.filter(id => id !== animeId);
    await user.save();
    res.status(200).json({ message: 'Anime supprimé des favoris' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
