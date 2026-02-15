import react from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom" 
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute" 

// This is the logout function
function Logout(){
  localStorage.clear()
  return <Navigate to="/login"></Navigate>
}

// This is the fucntion to logout and then register cause we wanna remove the old tokens present
function RegisterAndLogout(){
  localStorage.clear()
  return <Register></Register>
}

function App(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/"
            element={ // This is to be rendered when this route is present
              <ProtectedRoute>
                <Home></Home>
              </ProtectedRoute>
            }>
          </Route>
          <Route 
            path="/login"
            element={
              <Login />
            }
          ></Route>
          <Route 
            path="/register"
            element={
              <RegisterAndLogout></RegisterAndLogout>
            }>
          </Route>
          <Route 
            path="*" // render not found for any other element
            element={
              <NotFound></NotFound>
            }>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App