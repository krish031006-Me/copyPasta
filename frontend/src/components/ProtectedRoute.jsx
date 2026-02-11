/* This route is supposed to act as a wrapper around our other components 
   It's sole purpose is to stop unauthorized users to access a page or component and direct them somewhere else */

import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

function ProtectedRoute({ children }) { // children is used to catch all the elements associated with a component (like *args in python)
    const [isAuthorized, setIsAuthorized] = useState(null) // Using useState to store if the user is logged in or not

    // Using the useEffect to call access question
    useEffect(() => {
        
        // This is the function for refreshing the token
        const refreshtoken = async () => {
            const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN)
            try {
                // sending a request using api object and post method
                const res = await api.post("/api/token/refresh/", {
                    refresh: refreshTokenValue
                });
                if (res.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    setIsAuthorized(true)
                } else {
                    setIsAuthorized(false)
                }
            } catch (error) {
                console.log(error);
                setIsAuthorized(false)
            }
        }

        // This is the function for checking if the access token is present and is valid and if it's not valid then we refresh it
        const accesstoken = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN)
            if (!token) {
                setIsAuthorized(false)
                return
            }
            // decode the token and get the date
            const decoded = jwtDecode(token)
            const tokenExpiration = decoded.exp
            // Check if the token is valid or not
            const now = Date.now() / 1000

            if (tokenExpiration < now) {
                // this means the token is not valid and we need to refresh
                await refreshtoken()
            } else {
                setIsAuthorized(true)
            }
        }

        // Execute the logic
        // FIXED: changed isAuthorized(false) to setIsAuthorized(false)
        accesstoken().catch(() => setIsAuthorized(false))

    }, []);

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    // FIXED: Added replace so the back button doesn't loop
    return isAuthorized ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute