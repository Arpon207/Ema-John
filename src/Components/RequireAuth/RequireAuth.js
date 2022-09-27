import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../firebase.init";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    const location = useLocation();

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    }
    if (!user) {
        return (
            <Navigate to="/login" state={{ from: location }} replace></Navigate>
        );
    }
    return children;
};

export default RequireAuth;
