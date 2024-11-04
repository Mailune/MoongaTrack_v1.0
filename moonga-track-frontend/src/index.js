import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './Root'; // Remplacez App par Root pour intégrer le AuthProvider
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <Root />
    </PersistGate>
  </Provider>
);

reportWebVitals();
