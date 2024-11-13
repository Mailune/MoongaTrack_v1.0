const axios = require('axios');
const Anime = require('../models/Anime');
const Manga = require('../models/Manga');
const ANILIST_API_URL = 'https://graphql.anilist.co';

exports.searchContent = async (req, res) => {
  const { query, type } = req.query;

  const searchQuery = `
    query ($search: String, $type: MediaType) {
      Media(search: $search, type: $type) {
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
  `;

  try {
    const response = await axios.post(ANILIST_API_URL, {
      query: searchQuery,
      variables: { search: query, type },
    });
    const media = response.data.data.Media;

    // Enregistrer les résultats dans la base de données
    const Model = type === "ANIME" ? Anime : Manga;
    await Model.findOneAndUpdate(
      { anilistId: media.id },
      {
        anilistId: media.id,
        title: media.title,
        coverImage: media.coverImage.large,
        genres: media.genres,
      },
      { upsert: true }
    );

    res.json(media);
  } catch (error) {
    console.error(`Erreur lors de la recherche de contenu ${type} :`, error.message);
    res.status(500).json({ message: 'Erreur lors de la recherche de contenu', error: error.message });
  }
};
