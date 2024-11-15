import axios from 'axios';

// Backend API base URL (uses environment variable or defaults to localhost for development)
const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

/**
 * Fetch the list of mangas from the backend.
 *
 * Sends a GET request to the backend to retrieve a paginated list of mangas.
 *
 * @param {number} page - The current page number (default is 1).
 * @param {number} perPage - The number of items per page (default is 10).
 * @returns {Promise<object>} - The list of mangas with pagination details.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchMangaList = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/mangas`, {
      params: { page, perPage },
    });
    return response.data; // Returns the data from the response
  } catch (error) {
    console.error("Error fetching the manga list:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};
