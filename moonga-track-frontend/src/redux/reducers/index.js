import { combineReducers } from 'redux';
import authReducer from './authReducer';
import preferencesReducer from './preferencesReducer';
import libraryReducer from './libraryReducer'; // Importez correctement le reducer

const rootReducer = combineReducers({
  auth: authReducer,
  preferences: preferencesReducer,
  library: libraryReducer,
});

export default rootReducer;
