import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    if (loading) return <div>Chargement...</div>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
