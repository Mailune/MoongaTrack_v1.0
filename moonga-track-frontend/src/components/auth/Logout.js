import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Logout = () => {
    const { logout } = useAuth();

    return (
        <button onClick={logout}>Se déconnecter</button>
    );
};

export default Logout;
