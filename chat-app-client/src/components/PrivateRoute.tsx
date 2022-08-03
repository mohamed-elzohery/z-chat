import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../pages/LoadingPage";

const PrivateRoute = () => {
    const {isLoggedIn, isChecking} = useAuth();

    if(isChecking) return <LoadingPage />;

    return isLoggedIn && !isChecking ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute;