import React from 'react';
import { useAuth } from '../../context/AuthContext';

/**
 * Logout button component to allow the user to disconnect.
 *
 * @returns {JSX.Element} A button to trigger the logout functionality.
 */
const Logout = () => {
    const { logout } = useAuth();

    return (
        <button onClick={logout} aria-label="Se déconnecter">
            Se déconnecter
        </button>
    );
};

export default Logout;
