const axios = require('axios');

const ANILIST_API_URL = 'https://graphql.anilist.co';

// Get anime list from AniList with pagination
exports.getAnimeList = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query; // Pagination parameters

  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
        }
      }
    }
  `;

  try {
    const variables = { page: parseInt(page), perPage: parseInt(perPage) };
    const response = await axios.post(ANILIST_API_URL, { query, variables });
    res.json(response.data.data.Page.media);
  } catch (error) {
    console.error(`Error fetching data from AniList: ${error.message}`);
    res.status(500).json({ message: 'Error fetching data from AniList', error: error.message });
  }
};

// controllers/animeController.js
const { fetchFromAniList, searchMediaQuery } = require('../services/aniListService');

exports.searchAnime = async (req, res) => {
  const { search } = req.query;
  try {
    const data = await fetchFromAniList(searchMediaQuery, { search, type: "ANIME" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la recherche d\'anime.' });
  }
};
