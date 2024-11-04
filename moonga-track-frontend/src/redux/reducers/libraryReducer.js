
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

const initialState = {
    savedAnime: JSON.parse(localStorage.getItem('savedAnime')) || [],
    savedManga: JSON.parse(localStorage.getItem('savedManga')) || [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

const libraryReducer = (state = initialState, action) => {
    let updatedState;
    switch (action.type) {
        case SAVE_ANIME:
            updatedState = {
                ...state,
                savedAnime: [...state.savedAnime, action.payload],
            };
            break;
        case REMOVE_ANIME:
            updatedState = {
                ...state,
                savedAnime: state.savedAnime.filter((anime) => anime.id !== action.payload),
            };
            break;
        case SAVE_MANGA:
            updatedState = {
                ...state,
                savedManga: [...state.savedManga, action.payload],
            };
            break;
        case REMOVE_MANGA:
            updatedState = {
                ...state,
                savedManga: state.savedManga.filter((manga) => manga.id !== action.payload),
            };
            break;
        case ADD_FAVORITE:
            updatedState = {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
            break;
        case REMOVE_FAVORITE:
            updatedState = {
                ...state,
                favorites: state.favorites.filter((fav) => fav.id !== action.payload),
            };
            break;
        case UPDATE_ANIME:
            updatedState = {
                ...state,
                savedAnime: state.savedAnime.map((anime) =>
                    anime.id === action.payload.id ? action.payload : anime
                ),
            };
            break;
        case UPDATE_MANGA:
            updatedState = {
                ...state,
                savedManga: state.savedManga.map((manga) =>
                    manga.id === action.payload.id ? action.payload : manga
                ),
            };
            break;
        default:
            return state;
    }

    // Synchroniser avec le stockage local
    localStorage.setItem('savedAnime', JSON.stringify(updatedState.savedAnime));
    localStorage.setItem('savedManga', JSON.stringify(updatedState.savedManga));
    localStorage.setItem('favorites', JSON.stringify(updatedState.favorites));

    return updatedState;
};

export default libraryReducer;
