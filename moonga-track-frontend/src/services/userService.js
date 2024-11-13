// userService.js
import axios from 'axios';

// Ajouter un anime à la liste de suivi
export const addAnimeToWatchlist = async (animeId, status, rating, comment) => {
  try {
    const response = await axios.post('/api/user/watchlist', { animeId, status, rating, comment });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'anime à la liste de suivi:", error);
    throw error;
  }
};

// Récupérer la liste de suivi de l'utilisateur
export const getUserWatchlist = async () => {
  try {
    const response = await axios.get('/api/user/watchlist');
    return response.data.watchlist;
  } catch (error) {
    console.error("Erreur lors de la récupération de la liste de suivi:", error);
    throw error;
  }
};

// Ajouter un anime aux favoris
export const addAnimeToFavorites = async (animeId) => {
  try {
    const response = await axios.post('/api/user/favorites', { animeId });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'anime aux favoris:", error);
    throw error;
  }
};

// Récupérer les favoris de l'utilisateur
export const getUserFavorites = async () => {
  try {
    const response = await axios.get('/api/user/favorites');
    return response.data.favorites;
  } catch (error) {
    console.error("Erreur lors de la récupération des favoris:", error);
    throw error;
  };
};
