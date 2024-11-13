import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

// Obtenir la liste des animes du backend et les enregistrer dans la base de données
export const fetchAnimeList = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/animes`, {
      params: { page, perPage }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la liste des animes :", error);
    throw error;
  }
};

// Obtenir les recommandations d'animes pour un utilisateur donné
export const fetchAnimeRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/recommendations`, {
      params: { userId }
    });
    return response.data.recommendations;
  } catch (error) {
    console.error("Erreur lors de la récupération des recommandations d'animes :", error);
    throw error;
  }
};
