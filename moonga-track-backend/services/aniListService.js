const axios = require('axios');

// URL de l'API AniList
const ANILIST_API_URL = 'https://graphql.anilist.co';

// Fonction pour envoyer des requêtes vers l'API AniList
exports.fetchFromAniList = async (query, variables) => {
  try {
    const response = await axios.post(ANILIST_API_URL, {
      query,
      variables,
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la requête vers AniList :", error);
    throw error;
  }
};

// Requête pour rechercher un anime ou manga
exports.searchMediaQuery = `
  query ($search: String, $type: MediaType) {
    Media (search: $search, type: $type) {
      id
      title {
        romaji
        english
      }
      description
      coverImage {
        large
      }
      genres
    }
  }
`;

// Requête pour obtenir des recommandations basées sur un genre
exports.recommendationQuery = `
  query ($genre: String) {
    Page(perPage: 10) {
      media(genre: $genre, type: ANIME) {
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

// Nouvelle requête pour obtenir des recommandations personnalisées basées sur les genres et thèmes préférés
exports.personalizedRecommendationQuery = `
  query ($genres: [String], $themes: [String], $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(genre_in: $genres, tag_in: $themes, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        genres
        tags {
          name
        }
      }
    }
  }
`;
