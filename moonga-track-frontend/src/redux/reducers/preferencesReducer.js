/**
 * Initial state for user preferences.
 * 
 * @property {string} genre - The selected genre preference (default is an empty string).
 * @property {string} theme - The selected theme preference (default is an empty string).
 */
const initialPreferences = {
  genre: '',
  theme: '',
};

/**
* Reducer for managing user preferences.
* 
* This reducer handles the `UPDATE_PREFERENCES` action to update user preferences.
*
* @param {object} state - Current state of preferences.
* @param {object} action - Action dispatched to update preferences.
* @returns {object} - Updated state of preferences.
*/
const preferencesReducer = (state = initialPreferences, action) => {
  switch (action.type) {
      case 'UPDATE_PREFERENCES':
          // Updates preferences by merging the new payload with the existing state
          return {
              ...state,
              ...action.payload,
          };

      default:
          // Returns the current state for unhandled actions
          return state;
  }
};

export default preferencesReducer;
