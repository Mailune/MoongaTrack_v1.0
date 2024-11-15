const axios = require('axios');
const Anime = require('../models/Anime');
const Manga = require('../models/Manga');
const { fetchFromAniList, searchMediaQuery } = require('../services/aniListService');

/**
 * Search content (Anime or Manga) from AniList API and save to MongoDB
 */
exports.searchContent = async (req, res) => {
  const { query, type } = req.query;

  if (!query || !type) {
    return res.status(400).json({ message: 'Search query and type are required' });
  }

  try {
    const data = await fetchFromAniList(searchMediaQuery, { search: query, type });
    const media = data.Media;

    if (!media) {
      return res.status(404).json({ message: `No ${type} found for the provided query` });
    }

    const Model = type === 'ANIME' ? Anime : Manga;

    await Model.findOneAndUpdate(
      { anilistId: media.id },
      {
        anilistId: media.id,
        title: media.title,
        coverImage: media.coverImage.large,
        genres: media.genres,
      },
      { upsert: true, new: true }
    );

    res.status(200).json(media);
  } catch (error) {
    console.error(`Error searching content (${type}):`, error.message);
    res.status(500).json({ message: 'Error occurred while searching content', error: error.message });
  }
};