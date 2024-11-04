import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../redux/actions/authActions';

const CheckAuth = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (loading) return <p>Vérification en cours...</p>;
    return <div>{user ? `Bienvenue, ${user.username}` : error}</div>;
};

export default CheckAuth;