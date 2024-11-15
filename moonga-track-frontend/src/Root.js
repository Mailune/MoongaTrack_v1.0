import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from './App';

/**
 * Root component of the application.
 *
 * This component wraps the entire application with the Redux store provider and Redux Persist gate,
 * ensuring the state is managed and persisted across sessions.
 *
 * @returns {JSX.Element} - The root of the application.
 */
const Root = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

export default Root;
