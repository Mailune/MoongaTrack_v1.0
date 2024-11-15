import axios from 'axios';

/**
 * Add an anime to the user's watchlist.
 *
 * Sends a POST request to add an anime to the user's watchlist with specified details.
 *
 * @param {string} animeId - The ID of the anime to add.
 * @param {string} status - The status of the anime in the watchlist (e.g., "watching", "completed").
 * @param {number} rating - The user's rating for the anime.
 * @param {string} comment - A comment about the anime.
 * @returns {Promise<object>} - The response data from the backend.
 * @throws {Error} - Throws an error if the request fails.
 */
export const addAnimeToWatchlist = async (animeId, status, rating, comment) => {
  try {
    const response = await axios.post('/api/user/watchlist', { animeId, status, rating, comment });
    return response.data;
  } catch (error) {
    console.error("Error adding anime to the watchlist:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

/**
 * Fetch the user's watchlist.
 *
 * Sends a GET request to retrieve the user's anime watchlist from the backend.
 *
 * @returns {Promise<Array>} - An array of anime in the user's watchlist.
 * @throws {Error} - Throws an error if the request fails.
 */
export const getUserWatchlist = async () => {
  try {
    const response = await axios.get('/api/user/watchlist');
    return response.data.watchlist; // Returns the watchlist from the response
  } catch (error) {
    console.error("Error fetching user watchlist:", error);
    throw error;
  }
};

/**
 * Add an anime to the user's favorites.
 *
 * Sends a POST request to add an anime to the user's favorites.
 *
 * @param {string} animeId - The ID of the anime to add to favorites.
 * @returns {Promise<object>} - The response data from the backend.
 * @throws {Error} - Throws an error if the request fails.
 */
export const addAnimeToFavorites = async (animeId) => {
  try {
    const response = await axios.post('/api/user/favorites', { animeId });
    return response.data;
  } catch (error) {
    console.error("Error adding anime to favorites:", error);
    throw error;
  }
};

/**
 * Fetch the user's favorites.
 *
 * Sends a GET request to retrieve the user's favorite animes from the backend.
 *
 * @returns {Promise<Array>} - An array of anime in the user's favorites list.
 * @throws {Error} - Throws an error if the request fails.
 */
export const getUserFavorites = async () => {
  try {
    const response = await axios.get('/api/user/favorites');
    return response.data.favorites; // Returns the favorites from the response
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    throw error;
  }
};
