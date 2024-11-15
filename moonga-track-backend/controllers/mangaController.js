const axios = require('axios');
const Manga = require('../models/Manga');
const { fetchFromAniList, searchMediaQuery } = require('../services/aniListService');
const ANILIST_API_URL = 'https://graphql.anilist.co';

/**
 * Fetch manga list from AniList API and save to MongoDB
 */
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
          genres
        }
      }
    }
  `;

  try {
    const response = await axios.post(ANILIST_API_URL, { query });
    const mangas = response.data.data.Page.media;

    // Save or update manga records in MongoDB
    const bulkOperations = mangas.map((mangaData) => ({
      updateOne: {
        filter: { anilistId: mangaData.id },
        update: {
          anilistId: mangaData.id,
          title: mangaData.title,
          coverImage: mangaData.coverImage.large,
          genres: mangaData.genres,
        },
        upsert: true,
      },
    }));

    if (bulkOperations.length > 0) {
      await Manga.bulkWrite(bulkOperations);
    }

    res.status(200).json(mangas);
  } catch (error) {
    console.error("Error fetching manga data from AniList:", error.message);
    res.status(500).json({ message: 'Error fetching data from AniList', error: error.message });
  }
};

/**
 * Search for manga from AniList API
 */
exports.searchManga = async (req, res) => {
  const { search } = req.query;

  try {
    const data = await fetchFromAniList(searchMediaQuery, { search, type: 'MANGA' });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error searching for manga:", error.message);
    res.status(500).json({ error: 'Error occurred while searching for manga' });
  }
};
