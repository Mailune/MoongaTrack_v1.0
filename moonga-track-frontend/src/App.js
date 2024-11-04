import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/SignUpForm';
import RequestPasswordReset from './components/auth/RequestPasswordReset';
import ResetPassword from './pages/ResetPassword';
import ValidateResetCode from './pages/ValidateResetCode';
import AccountVerification from './pages/AccountVerification';
import Profile from './pages/Profile';
import UserPreferences from './pages/UserPreferences';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar'; // Barre de navigation
import AnimeList from './pages/AnimeList';
import MangaList from './pages/MangaList';
import Favorites from './pages/Favorites';
import Suggestions from './pages/Suggestions';
import SearchResults from './pages/SearchResults';
import DetailPage from './pages/DetailPage';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    {/* NavBar affichée sur chaque page */}
                    <NavBar /> 
                    <Routes>
                        {/* Route par défaut pour la page d'accueil */}
                        <Route path="/" element={<Home />} />

                        {/* Routes publiques pour l'authentification */}
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/reset-password-request" element={<RequestPasswordReset />} />
                        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                        <Route path="/validate-reset-code" element={<ValidateResetCode />} />
                        <Route path="/validate" element={<AccountVerification />} />
                        <Route path="/anime-list" element={<AnimeList />} />
                        <Route path="/manga-list" element={<MangaList />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/suggestions" element={<Suggestions />} />

                         {/* Routes pour la recherche */}
                        <Route path="/search-results" element={<SearchResults />} />
                        <Route path="/details/:id" element={<DetailPage />} />

                        {/* Routes privées pour les utilisateurs authentifiés */}
                        <Route path="/profile" element={<PrivateRoute />}>
                            <Route index element={<Profile />} />
                        </Route>
                        <Route path="/preferences" element={<PrivateRoute />}>
                            <Route index element={<UserPreferences />} />
                        </Route>

                        {/* Redirection par défaut pour les routes inconnues */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    );
};

export default App;
