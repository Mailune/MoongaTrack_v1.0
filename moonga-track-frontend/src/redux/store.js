import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

/**
 * Configuration for Redux Persist.
 * 
 * @property {string} key - The key for the root of the persisted state.
 * @property {object} storage - Storage engine to use for persisting the state (localStorage in this case).
 */
const persistConfig = {
  key: 'root',
  storage,
};

/**
 * Create a persisted reducer by combining the rootReducer with the persistConfig.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configure the Redux store with the persisted reducer and default middleware.
 *
 * Middleware is configured to disable the `serializableCheck` for compatibility with Redux Persist.
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables serializability checks for non-serializable values in the state
    }),
});

/**
 * Create a persistor to persist and rehydrate the Redux state.
 */
const persistor = persistStore(store);

export { store, persistor };
