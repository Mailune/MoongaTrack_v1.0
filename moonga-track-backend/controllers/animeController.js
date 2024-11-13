const axios = require('axios');
const Anime = require('../models/Anime');
const ANILIST_API_URL = 'https://graphql.anilist.co';

// Get anime list from AniList with pagination and save to MongoDB
exports.getAnimeList = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;

  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          genres
        }
      }
    }
  `;

  try {
    const variables = { page: parseInt(page), perPage: parseInt(perPage) };
    const response = await axios.post(ANILIST_API_URL, { query, variables });
    const animes = response.data.data.Page.media;

    // Save or update anime records in MongoDB
    for (const animeData of animes) {
      await Anime.findOneAndUpdate(
        { anilistId: animeData.id },
        {
          anilistId: animeData.id,
          title: animeData.title,
          coverImage: animeData.coverImage.large,
          genres: animeData.genres,
        },
        { upsert: true, new: true }
      );
    }

    res.json(animes);
  } catch (error) {
    console.error(`Error fetching data from AniList: ${error.message}`);
    res.status(500).json({ message: 'Error fetching data from AniList', error: error.message });
  }
};

// Search anime from AniList
exports.searchAnime = async (req, res) => {
  const { search } = req.query;
  try {
    const data = await fetchFromAniList(searchMediaQuery, { search, type: "ANIME" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la recherche d\'anime.' });
  }
};
