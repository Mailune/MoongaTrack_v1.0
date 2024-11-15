import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Home from './pages/Home';
import LoginPage from './features/account/Login';
import SignupPage from './forms/SignUpForm';
import RequestPasswordReset from './components/auth/RequestPasswordReset';
import ResetPassword from './features/account/ResetPassword';
import ValidateResetCode from './features/account/ValidateResetCode';
import AccountVerification from './features/account/AccountVerification';
import Profile from './pages/Profile';
import UserPreferences from './pages/UserPreferences';
import PrivateRoute from './components/common/PrivateRoute';
import NavBar from './components/common/NavBar';
import AnimeList from './pages/AnimeList';
import MangaList from './pages/MangaList';
import Favorites from './pages/Favorites';
import Suggestions from './pages/Suggestions';
import SearchResults from './pages/SearchResults';
import DetailPage from './pages/DetailPage';

/**
 * Root component of the application.
 *
 * This component sets up the Redux store, handles persisted state with Redux Persist,
 * and defines all routes for the application using React Router.
 *
 * @returns {JSX.Element} - The rendered application.
 */
const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    {/* Navigation bar displayed on all pages */}
                    <NavBar />
                    <Routes>
                        {/* Default route for the home page */}
                        <Route path="/" element={<Home />} />

                        {/* Public authentication routes */}
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

                        {/* Routes for search functionality */}
                        <Route path="/search-results" element={<SearchResults />} />
                        <Route path="/details/:id" element={<DetailPage />} />

                        {/* Private routes for authenticated users */}
                        <Route path="/profile" element={<PrivateRoute />}>
                            <Route index element={<Profile />} />
                        </Route>
                        <Route path="/preferences" element={<PrivateRoute />}>
                            <Route index element={<UserPreferences />} />
                        </Route>

                        {/* Default redirection for unknown routes */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    );
};

export default App;
