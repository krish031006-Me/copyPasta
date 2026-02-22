import {useState, useEffect} from "react"
import api from "../api"
import Note from "../components/Notes"

function Home(){
    const [snippets, setSnippets] = useState([]);
    const [notes, setNotes] = useState([]);
    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    
    // This is the function to get the snippet
    const getSnippet = async() => {
        await api.get("api/snippets/")  
        .then((res) => res = res.data)
        .then((data) => {setSnippets(data); console.log(data)})
        .catch((err) => alert(err))
    }
    
    // THis is the function to delete node
    const deleteSnippet = async(id) => {
        await api.delete(`api/snippets/delete/${id}`)
        .then((res) => {
            if (res.status === 204){
                alert("Item deleted.")
                // calling the getSnippet function to print the code after deletion
                // we could simply delete stuff from state but we are not using it
                getSnippet(); 
            }else{
                alert("Failed.")
            }
        }).catch((err) => alert(err))
    }

    // This is the function to create a code snippet
    const createSnippet = async(e) => {
        e.preventDefault() // to avoid submitting the form
        await api.post("api/snippets/", {
            title:title,
            code:code
        }) 
        .then((res) => {
            if(res.status === 200){ // means the code snippet is created
                alert("Snippet Created") 
                getSnippet();
            }
        }).catch((err) => alert(err))
    }

    // Using useEffect to call the functions
    useEffect(() => {
        getSnippet();
    }, [])

    return <div>
        <div>
            <h2>Your codes:</h2>
            {console.log("Going to notes component")}
            {snippets.map((note) => (
                <Note note={note} onDelete={deleteSnippet} key={note.id}/>)
            )} 
        </div>
        <h2>Create a snippet-</h2>
        <form onSubmit={createSnippet}>
            <label htmlFor="title">Title:</label>
            <br />
            <input 
                required 
                autoComplete="off"
                type="text"
                name="title"
                id="title"
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
            />
            <br />
            <textarea 
                required
                autoComplete="off"
                type="text"
                name="code"
                value={code}
                id="code"
                onChange={(e) => setCode(e.target.value)} 
            />
            <input type="submit" value="Submit" />
        </form>
    </div>
}

export default Home