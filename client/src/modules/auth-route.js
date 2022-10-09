import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
    const auth_user = JSON.parse(localStorage.getItem("auth.user")); // determine if authenticated

    // authenticated => return an outlet that will render child elements
    // not authenticated => return element that will navigate to login page
    return auth_user ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRoute;