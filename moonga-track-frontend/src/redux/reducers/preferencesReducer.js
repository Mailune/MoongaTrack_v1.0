
const initialPreferences = {
    genre: '',
    theme: '',
  };
  
  const preferencesReducer = (state = initialPreferences, action) => {
    switch (action.type) {
      case 'UPDATE_PREFERENCES':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default preferencesReducer;
  