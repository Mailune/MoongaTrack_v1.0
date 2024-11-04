import axios from 'axios';

export const searchContent = async (query) => {
    const searchQuery = `
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
    const response = await axios.post('https://graphql.anilist.co', {
        query: searchQuery,
        variables: variables,
    });
    return response.data.data.Page.media;
};

export const fetchAnimeRecommendations = async (userId) => {
    // Logique pour récupérer les recommandations basées sur l'utilisateur
};
