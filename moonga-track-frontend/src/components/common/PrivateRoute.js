import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

/**
 * PrivateRoute Component.
 * Protects routes by checking user authentication status.
 *
 * @returns {JSX.Element} Either the protected route content or a redirect to the login page.
 */
const PrivateRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    // Show a loading message while authentication status is being determined
    if (loading) return <div>Chargement...</div>;

    // Render the protected content if authenticated, otherwise redirect to login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;