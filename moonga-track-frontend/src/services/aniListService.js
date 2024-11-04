import axios from 'axios';

// URL de l'API AniList
const ANILIST_API_URL = 'https://graphql.anilist.co';

export const fetchFromAniList = async (query, variables) => {
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
