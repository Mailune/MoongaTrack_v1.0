import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../redux/actions/authActions';

/**
 * Component to check and display user authentication status.
 *
 * @returns {JSX.Element} The authentication status component.
 */
const CheckAuth = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    // Dispatch authentication check on component mount
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    // Render a loading message while checking authentication
    if (loading) return <p>Vérification en cours...</p>;

    // Render welcome message if authenticated or show error if any
    return (
        <div>
            {user ? `Bienvenue, ${user.username}` : error || 'Une erreur est survenue.'}
        </div>
    );
};

export default CheckAuth;