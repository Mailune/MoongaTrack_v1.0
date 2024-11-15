import axios from 'axios';

/**
 * Perform a search query on the AniList GraphQL API.
 *
 * @param {string} query - The search term entered by the user.
 * @returns {Promise<Array>} - A list of media matching the search query.
 */
export const searchContent = async (query) => {
    const graphqlQuery = `
        query ($search: String) {
            Page(page: 1, perPage: 10) {
                media(search: $search) {
                    id
                    title {
                        romaji
                    }
                    coverImage {
                        large
                    }
                }
            }
        }
    `;

    const variables = { search: query };

    try {
        const response = await axios.post('https://graphql.anilist.co', {
            query: graphqlQuery,
            variables: variables,
        });

        return response.data.data.Page.media;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error; // Rethrow to handle it in calling functions
    }
};

/**
 * Fetch anime recommendations for a given user.
 *
 * @param {string} userId - The ID of the user for whom to fetch recommendations.
 * @returns {Promise<Array>} - A list of recommended anime (to be implemented).
 */
export const fetchAnimeRecommendations = async (userId) => {
    console.warn('fetchAnimeRecommendations is not yet implemented.');
    // Placeholder for future implementation
    // Example: fetch recommendations based on user's watch history
};