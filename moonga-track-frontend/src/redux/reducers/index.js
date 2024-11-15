import { combineReducers } from 'redux';
import authReducer from './authReducer';
import preferencesReducer from './preferencesReducer';
import libraryReducer from './libraryReducer';

/**
 * Root reducer that combines all individual reducers.
 *
 * This is the main reducer used by the Redux store, which delegates specific parts
 * of the state management to specialized reducers.
 *
 * @property {object} auth - State managed by the authentication reducer.
 * @property {object} preferences - State managed by the preferences reducer.
 * @property {object} library - State managed by the library reducer.
 */
const rootReducer = combineReducers({
  auth: authReducer, // Handles user authentication-related state
  preferences: preferencesReducer, // Manages user preferences
  library: libraryReducer, // Handles saved anime, manga, and favorites
});

export default rootReducer;
