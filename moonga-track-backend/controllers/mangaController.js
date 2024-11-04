const axios = require('axios');

const ANILIST_API_URL = 'https://graphql.anilist.co';

// Get manga list from AniList
exports.getMangaList = async (req, res) => {
  const query = `
    query {
      Page {
        media(type: MANGA) {
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
    const response = await axios.post(ANILIST_API_URL, { query });
    res.json(response.data.data.Page.media);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from AniList' });
  }
};

const { fetchFromAniList, searchMediaQuery } = require('../services/aniListService');

exports.searchManga = async (req, res) => {
  const { search } = req.query;
  try {
    const data = await fetchFromAniList(searchMediaQuery, { search, type: "MANGA" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la recherche de manga.' });
  }
};