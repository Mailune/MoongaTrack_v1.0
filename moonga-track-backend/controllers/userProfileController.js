const User = require('../models/User');

/**
 * Get the profile of the logged-in user
 */
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Update the profile of the logged-in user
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const { favoriteGenres, favoriteThemes } = req.body.preferences || {};
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { preferences: { favoriteGenres, favoriteThemes } },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Add an anime to the user's watchlist
 */
exports.addAnimeToWatchlist = async (req, res) => {
  try {
    const { animeId, status, rating, comment } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const animeExists = user.animeList.some(item => item.animeId === animeId);
    if (animeExists) {
      return res.status(400).json({ message: 'Anime already in watchlist' });
    }

    user.animeList.push({ animeId, status, rating, comment });
    await user.save();

    res.status(200).json({ message: 'Anime added to watchlist', animeList: user.animeList });
  } catch (error) {
    console.error('Error adding anime to watchlist:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Add an anime to the user's favorites
 */
exports.addAnimeToFavorites = async (req, res) => {
  try {
    const { animeId } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.favorites.includes(animeId)) {
      return res.status(400).json({ message: 'Anime already in favorites' });
    }

    user.favorites.push(animeId);
    await user.save();

    res.status(200).json({ message: 'Anime added to favorites', favorites: user.favorites });
  } catch (error) {
    console.error('Error adding anime to favorites:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Get the user's watchlist
 */
exports.getUserWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ watchlist: user.animeList });
  } catch (error) {
    console.error('Error fetching watchlist:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Remove an anime from the user's watchlist
 */
exports.removeAnimeFromWatchlist = async (req, res) => {
  try {
    const { animeId } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.animeList = user.animeList.filter(item => item.animeId !== animeId);
    await user.save();

    res.status(200).json({ message: 'Anime removed from watchlist', animeList: user.animeList });
  } catch (error) {
    console.error('Error removing anime from watchlist:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Remove an anime from the user's favorites
 */
exports.removeAnimeFromFavorites = async (req, res) => {
  try {
    const { animeId } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter(id => id !== animeId);
    await user.save();

    res.status(200).json({ message: 'Anime removed from favorites', favorites: user.favorites });
  } catch (error) {
    console.error('Error removing anime from favorites:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};