// Action types
export const SAVE_ANIME = 'SAVE_ANIME';
export const REMOVE_ANIME = 'REMOVE_ANIME';
export const SAVE_MANGA = 'SAVE_MANGA';
export const REMOVE_MANGA = 'REMOVE_MANGA';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const UPDATE_ANIME = 'UPDATE_ANIME';
export const UPDATE_MANGA = 'UPDATE_MANGA';

/**
 * Helper function to save updated state to localStorage.
 *
 * @param {string} key - The key to store data under in localStorage.
 * @param {Function} getState - Redux getState function to access the current state.
 * @param {string} statePath - The path within the state to save.
 */
const saveToLocalStorage = (key, getState, statePath) => {
    const stateData = getState().library[statePath];
    localStorage.setItem(key, JSON.stringify(stateData));
};

/**
 * Action to save an anime to the user's library.
 *
 * @param {object} anime - Anime object to be saved.
 * @returns {Function} - Redux thunk action.
 */
export const saveAnime = (anime) => (dispatch, getState) => {
    dispatch({ type: SAVE_ANIME, payload: anime });
    saveToLocalStorage('savedAnime', getState, 'savedAnime');
};

/**
 * Action to remove an anime from the user's library.
 *
 * @param {string|number} id - The ID of the anime to remove.
 * @returns {Function} - Redux thunk action.
 */
export const removeAnime = (id) => (dispatch, getState) => {
    dispatch({ type: REMOVE_ANIME, payload: id });
    saveToLocalStorage('savedAnime', getState, 'savedAnime');
};

/**
 * Action to save a manga to the user's library.
 *
 * @param {object} manga - Manga object to be saved.
 * @returns {Function} - Redux thunk action.
 */
export const saveManga = (manga) => (dispatch, getState) => {
    dispatch({ type: SAVE_MANGA, payload: manga });
    saveToLocalStorage('savedManga', getState, 'savedManga');
};

/**
 * Action to remove a manga from the user's library.
 *
 * @param {string|number} id - The ID of the manga to remove.
 * @returns {Function} - Redux thunk action.
 */
export const removeManga = (id) => (dispatch, getState) => {
    dispatch({ type: REMOVE_MANGA, payload: id });
    saveToLocalStorage('savedManga', getState, 'savedManga');
};

/**
 * Action to add an item (anime/manga) to the user's favorites.
 *
 * @param {object} item - The item to add to favorites.
 * @returns {Function} - Redux thunk action.
 */
export const addFavorite = (item) => (dispatch, getState) => {
    dispatch({ type: ADD_FAVORITE, payload: item });
    saveToLocalStorage('favorites', getState, 'favorites');
};

/**
 * Action to remove an item from the user's favorites.
 *
 * @param {string|number} id - The ID of the item to remove from favorites.
 * @returns {Function} - Redux thunk action.
 */
export const removeFavorite = (id) => (dispatch, getState) => {
    dispatch({ type: REMOVE_FAVORITE, payload: id });
    saveToLocalStorage('favorites', getState, 'favorites');
};

/**
 * Action to update an anime in the user's library.
 *
 * @param {object} anime - Updated anime object.
 * @returns {Function} - Redux thunk action.
 */
export const updateAnime = (anime) => (dispatch, getState) => {
    dispatch({ type: UPDATE_ANIME, payload: anime });
    saveToLocalStorage('savedAnime', getState, 'savedAnime');
};

/**
 * Action to update a manga in the user's library.
 *
 * @param {object} manga - Updated manga object.
 * @returns {Function} - Redux thunk action.
 */
export const updateManga = (manga) => (dispatch, getState) => {
    dispatch({ type: UPDATE_MANGA, payload: manga });
    saveToLocalStorage('savedManga', getState, 'savedManga');
};
