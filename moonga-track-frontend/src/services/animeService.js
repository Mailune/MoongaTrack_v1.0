import axios from 'axios';

// Backend API base URL (uses environment variable or defaults to localhost for development)
const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

/**
 * Fetch the list of animes from the backend.
 *
 * Sends a GET request to the backend to retrieve a paginated list of animes.
 *
 * @param {number} page - The current page number (default is 1).
 * @param {number} perPage - The number of items per page (default is 10).
 * @returns {Promise<object>} - The list of animes with pagination details.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchAnimeList = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/animes`, {
      params: { page, perPage },
    });
    return response.data; // Returns the data from the response
  } catch (error) {
    console.error("Error fetching the anime list:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

/**
 * Fetch anime recommendations for a specific user.
 *
 * Sends a GET request to the backend to retrieve personalized anime recommendations.
 *
 * @param {string} userId - The ID of the user for whom recommendations are being fetched.
 * @returns {Promise<Array>} - A list of recommended animes for the user.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchAnimeRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/recommendations`, {
      params: { userId },
    });
    return response.data.recommendations; // Returns the recommendations from the response
  } catch (error) {
    console.error("Error fetching anime recommendations:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};
