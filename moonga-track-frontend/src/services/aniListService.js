import axios from 'axios';

// AniList API base URL
const ANILIST_API_URL = 'https://graphql.anilist.co';

/**
 * Fetch data from the AniList GraphQL API.
 *
 * This utility function sends a POST request to the AniList GraphQL API
 * with the specified query and variables.
 *
 * @param {string} query - The GraphQL query string to execute.
 * @param {object} variables - An object containing the variables for the GraphQL query.
 * @returns {Promise<object>} - The data returned by the AniList API.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchFromAniList = async (query, variables) => {
  try {
    const response = await axios.post(ANILIST_API_URL, {
      query,
      variables,
    });
    return response.data.data; // Return the data from the response
  } catch (error) {
    console.error("Error during the request to AniList:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
