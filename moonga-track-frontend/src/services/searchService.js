import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

// Fonction pour rechercher des contenus (anime ou manga) via le backend
export const searchContent = async (query, type) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/search`, {
      params: { query, type }
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la recherche de ${type} :`, error);
    throw error;
  }
};
