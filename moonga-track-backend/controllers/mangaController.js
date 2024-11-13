const axios = require('axios');
const Manga = require('../models/Manga');
const ANILIST_API_URL = 'https://graphql.anilist.co';

// Get manga list from AniList and save to MongoDB
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
    for (const mangaData of mangas) {
      await Manga.findOneAndUpdate(
        { anilistId: mangaData.id },
        {
          anilistId: mangaData.id,
          title: mangaData.title,
          coverImage: mangaData.coverImage.large,
          genres: mangaData.genres,
        },
        { upsert: true, new: true }
      );
    }

    res.json(mangas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from AniList' });
  }
};

// Search manga from AniList
exports.searchManga = async (req, res) => {
  const { search } = req.query;
  try {
    const data = await fetchFromAniList(searchMediaQuery, { search, type: "MANGA" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la recherche de manga.' });
  }
};
