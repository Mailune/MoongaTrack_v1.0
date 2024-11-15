const axios = require('axios');

/**
 * Base URL for the AniList GraphQL API
 */
const ANILIST_API_URL = 'https://graphql.anilist.co';

/**
 * Function to send requests to the AniList API
 * @param {string} query - GraphQL query string
 * @param {object} variables - Variables for the GraphQL query
 * @returns {Promise<object>} - The data retrieved from AniList API
 */
exports.fetchFromAniList = async (query, variables) => {
  try {
    const response = await axios.post(ANILIST_API_URL, {
      query,
      variables,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data from AniList API:', error);
    throw error;
  }
};

/**
 * GraphQL query for searching anime or manga by title
 */
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

/**
 * GraphQL query for fetching recommendations based on a specific genre
 */
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

/**
 * GraphQL query for personalized recommendations based on genres and themes
 */
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
