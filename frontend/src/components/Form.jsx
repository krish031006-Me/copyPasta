import {useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"

function Form({path, method}){ // These are the props passed to you
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate() 
    const name = method === "Login" ? "Login":"Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault() // stops the form from submitting

        try{
            const res = await api.post(path, {username, password})
            if (method === "Login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/") 
            } else{
                navigate("/login") 
            }
        }catch(error){
            alert(error)
        }finally{
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input 
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="off"
            autoFocus>
        </input>
        <input 
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="off">
        </input>
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form