import {
    SAVE_ANIME,
    REMOVE_ANIME,
    SAVE_MANGA,
    REMOVE_MANGA,
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    UPDATE_ANIME,
    UPDATE_MANGA,
} from '../actions/libraryActions';

/**
 * Initial state for the library reducer.
 * 
 * @property {Array} savedAnime - List of saved anime, initialized from localStorage or empty.
 * @property {Array} savedManga - List of saved manga, initialized from localStorage or empty.
 * @property {Array} favorites - List of favorite items (anime/manga), initialized from localStorage or empty.
 */
const initialState = {
    savedAnime: JSON.parse(localStorage.getItem('savedAnime')) || [],
    savedManga: JSON.parse(localStorage.getItem('savedManga')) || [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

/**
 * Library reducer to handle saved anime, manga, and favorites.
 * 
 * Synchronizes state changes with localStorage for persistence.
 *
 * @param {object} state - Current state of the library.
 * @param {object} action - Action dispatched to the reducer.
 * @returns {object} - Updated state after the action is processed.
 */
const libraryReducer = (state = initialState, action) => {
    let updatedState;

    switch (action.type) {
        case SAVE_ANIME:
            // Adds a new anime to the savedAnime list
            updatedState = {
                ...state,
                savedAnime: [...state.savedAnime, action.payload],
            };
            break;

        case REMOVE_ANIME:
            // Removes an anime by ID from the savedAnime list
            updatedState = {
                ...state,
                savedAnime: state.savedAnime.filter((anime) => anime.id !== action.payload),
            };
            break;

        case SAVE_MANGA:
            // Adds a new manga to the savedManga list
            updatedState = {
                ...state,
                savedManga: [...state.savedManga, action.payload],
            };
            break;

        case REMOVE_MANGA:
            // Removes a manga by ID from the savedManga list
            updatedState = {
                ...state,
                savedManga: state.savedManga.filter((manga) => manga.id !== action.payload),
            };
            break;

        case ADD_FAVORITE:
            // Adds an item to the favorites list
            updatedState = {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
            break;

        case REMOVE_FAVORITE:
            // Removes an item by ID from the favorites list
            updatedState = {
                ...state,
                favorites: state.favorites.filter((fav) => fav.id !== action.payload),
            };
            break;

        case UPDATE_ANIME:
            // Updates an anime by replacing it with the new payload
            updatedState = {
                ...state,
                savedAnime: state.savedAnime.map((anime) =>
                    anime.id === action.payload.id ? action.payload : anime
                ),
            };
            break;

        case UPDATE_MANGA:
            // Updates a manga by replacing it with the new payload
            updatedState = {
                ...state,
                savedManga: state.savedManga.map((manga) =>
                    manga.id === action.payload.id ? action.payload : manga
                ),
            };
            break;

        default:
            // Returns current state for unhandled actions
            return state;
    }

    // Synchronize updated state with localStorage
    localStorage.setItem('savedAnime', JSON.stringify(updatedState.savedAnime));
    localStorage.setItem('savedManga', JSON.stringify(updatedState.savedManga));
    localStorage.setItem('favorites', JSON.stringify(updatedState.favorites));

    return updatedState;
};

export default libraryReducer;
