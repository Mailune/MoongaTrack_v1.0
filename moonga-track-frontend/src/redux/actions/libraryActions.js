export const SAVE_ANIME = 'SAVE_ANIME';
export const REMOVE_ANIME = 'REMOVE_ANIME';
export const SAVE_MANGA = 'SAVE_MANGA';
export const REMOVE_MANGA = 'REMOVE_MANGA';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const UPDATE_ANIME = 'UPDATE_ANIME';
export const UPDATE_MANGA = 'UPDATE_MANGA';

export const saveAnime = (anime) => (dispatch, getState) => {
    dispatch({ type: SAVE_ANIME, payload: anime });
    localStorage.setItem('savedAnime', JSON.stringify(getState().library.savedAnime));
};

export const removeAnime = (id) => (dispatch, getState) => {
    dispatch({ type: REMOVE_ANIME, payload: id });
    localStorage.setItem('savedAnime', JSON.stringify(getState().library.savedAnime));
};

export const saveManga = (manga) => (dispatch, getState) => {
    dispatch({ type: SAVE_MANGA, payload: manga });
    localStorage.setItem('savedManga', JSON.stringify(getState().library.savedManga));
};

export const removeManga = (id) => (dispatch, getState) => {
    dispatch({ type: REMOVE_MANGA, payload: id });
    localStorage.setItem('savedManga', JSON.stringify(getState().library.savedManga));
};

export const addFavorite = (item) => (dispatch, getState) => {
    dispatch({ type: ADD_FAVORITE, payload: item });
    localStorage.setItem('favorites', JSON.stringify(getState().library.favorites));
};

export const removeFavorite = (id) => (dispatch, getState) => {
    dispatch({ type: REMOVE_FAVORITE, payload: id });
    localStorage.setItem('favorites', JSON.stringify(getState().library.favorites));
};

export const updateAnime = (anime) => (dispatch, getState) => {
    dispatch({ type: UPDATE_ANIME, payload: anime });
    localStorage.setItem('savedAnime', JSON.stringify(getState().library.savedAnime));
};

export const updateManga = (manga) => (dispatch, getState) => {
    dispatch({ type: UPDATE_MANGA, payload: manga });
    localStorage.setItem('savedManga', JSON.stringify(getState().library.savedManga));
};
