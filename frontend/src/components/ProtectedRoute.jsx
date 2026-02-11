import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        // Define functions INSIDE useEffect to avoid dependency/loop issues
        const auth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                setIsAuthorized(false);
                return;
            }

            const decoded = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        };

        const refreshToken = async () => {
            const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN);
            try {
                const res = await api.post("api/token/refresh", {
                    refresh: refreshTokenValue,
                });
                if (res.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.log(error);
                setIsAuthorized(false);
            }
        };

        // Call it once
        auth().catch(() => setIsAuthorized(false));
        
    }, []); // Empty array = Runs once on mount

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;