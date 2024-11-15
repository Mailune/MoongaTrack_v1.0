const axios = require('axios');
const Anime = require('../models/Anime');
const { fetchFromAniList, searchMediaQuery } = require('../services/aniListService');
const ANILIST_API_URL = 'https://graphql.anilist.co';

/**
 * Fetch anime list from AniList API with pagination and save to MongoDB
 */
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
    const variables = { page: parseInt(page, 10), perPage: parseInt(perPage, 10) };
    const response = await axios.post(ANILIST_API_URL, { query, variables });
    const animes = response.data.data.Page.media;

    // Save or update anime records in MongoDB
    const bulkOperations = animes.map((animeData) => ({
      updateOne: {
        filter: { anilistId: animeData.id },
        update: {
          anilistId: animeData.id,
          title: animeData.title,
          coverImage: animeData.coverImage.large,
          genres: animeData.genres,
        },
        upsert: true,
      },
    }));

    if (bulkOperations.length > 0) {
      await Anime.bulkWrite(bulkOperations);
    }

    res.status(200).json(animes);
  } catch (error) {
    console.error(`Error fetching data from AniList: ${error.message}`);
    res.status(500).json({ message: 'Error fetching data from AniList', error: error.message });
  }
};

/**
 * Search for anime from AniList API
 */
exports.searchAnime = async (req, res) => {
  const { search } = req.query;

  try {
    const data = await fetchFromAniList(searchMediaQuery, { search, type: 'ANIME' });
    res.status(200).json(data);
  } catch (error) {
    console.error(`Error searching for anime: ${error.message}`);
    res.status(500).json({ error: 'Error occurred while searching for anime' });
  }
};