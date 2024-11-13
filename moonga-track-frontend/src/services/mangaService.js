import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

// Obtenir la liste des mangas du backend et les enregistrer dans la base de données
export const fetchMangaList = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/mangas`, {
      params: { page, perPage }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la liste des mangas :", error);
    throw error;
  }
};
