// We are going to create an interceptor here which will act as a middleman between our API server and React app
// What do Interceptors do?
// They allow you to write logic in one single place that runs for every API call, rather than repeating that logic in every single useEffect or button click handler.

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

// Here we are creating a custom instance of axios to send our requests 
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL // we are getting the baseURL form our environment file .env
})

// Now we are going to create a request interceptor that is gonna check every request if it has the authorization token
api.interceptors.request.use(
    (config) => { // Here config is kind of like an envelope that is used to store information on web
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}` // adding the authorisation token to header in config
        }
        return config
    },
    (error) => { // This is the function to show the error
        return Promise.reject(error)
    }
)

export default api // From now on we will be using this api object in our components instead of going straight with axios