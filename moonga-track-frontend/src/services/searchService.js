import axios from 'axios';

// Backend API base URL (uses environment variable or defaults to localhost for development)
const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

/**
 * Search for content (anime or manga) via the backend.
 *
 * Sends a GET request to the backend search endpoint with the specified query and content type.
 *
 * @param {string} query - The search query string.
 * @param {string} type - The type of content to search for (e.g., "anime" or "manga").
 * @returns {Promise<object>} - The search results returned by the backend.
 * @throws {Error} - Throws an error if the request fails.
 */
export const searchContent = async (query, type) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/search`, {
      params: { query, type },
    });
    return response.data; // Returns the data from the response
  } catch (error) {
    console.error(`Error while searching for ${type}:`, error);
    throw error; // Re-throw the error for handling in the calling function
  }
};
