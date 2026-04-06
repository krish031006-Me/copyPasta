import SideBar from "../components/SideBar"
import DashboardHeader  from "../components/DashboardHeader" 
import StatsBar from "../components/StatsBar"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import SnippetCard from "../components/SnippetCard"
import api from "../api"
import QuickAddSnippetModal from "../components/SnippetLayering"
import "../styles/global.css"
import { ACCESS_TOKEN } from "../constants"

function Dashboard(){
    // Using state to store the count and snippets
    const [snippets, setSnippets] = useState([]);
    const [count, setCount] = useState({});
    const [searchParam] = useSearchParams();
    const [isCopied, setIsCopied] = useState(false);
    const [showing, setShowing] = useState("All Snippets");
    const [open, setIsOpen] = useState(false);
    const token = localStorage.getItem(ACCESS_TOKEN) 

    // This is the function to close that modal window 
    const onClose = (() => {
        setIsOpen(false)    
    })

        const snippetIdMatches = (s, key) =>
            s.id === key || String(s.id) === String(key)

    const toggleFavorite = async (key) => {
        const snippet = snippets.find((s) => snippetIdMatches(s, key))
        if (!snippet) {
            console.error("Snippet not found")
            return
        }
        const next = !Boolean(snippet.is_favorite)
        setSnippets((prev) =>
            prev.map((s) =>
                snippetIdMatches(s, key) ? { ...s, is_favorite: next } : s
            )
        ) 
        try {
            const res = await api.patch(`api/snippets/delete/${key}/`, {
                is_favorite: next,
            }) 
            if (res.status !== 200 && res.status !== 204) {
                throw new Error("Failed to update favorite state")
            }
        } catch (err) {
            console.error(err)
            setSnippets((prev) =>
                prev.map((s) =>
                    snippetIdMatches(s, key)
                        ? { ...s, is_favorite: !next }
                        : s
                )
            )
        }
    }
        
    // This is the function to control the copying of content
    const handleCopy = async(text) => {
        try{
            await navigator.clipboard.writeText(text) // Storing in the clipboard
            setIsCopied(true)
            // returning to false after 2.0 seconds
            setTimeout(() => {
                setIsCopied(false)
            }, 2000)
            alert("Copied to clipboard")
        }catch(err){
            console.error(err)
        }

    }
    
    const handleDelete = async (key) => {
        try {
            const res = await api.delete(`api/snippets/delete/${key}/`)
            if (res.status === 204) {
                setSnippets((prev) => prev.filter((s) => s.id !== key))
            } else {
                console.error("Failed to move snippet to trash")
            }
        } catch(err){ 
            console.error(err)
        }
    }

    // This is the function to get the count
    async function LoadCounts() {
        const types = ["all", "code", "links", "text", "favorites", "recent", "trash"]
        const results = {}
        await Promise.all(
            types.map(async (type) => {
            const res = await api.get(`api/snippets/?type=${type}`,{
                headers: {
                    Authorization: `Bearer ${token}` // This tells the backend who you are!
                  } 
            })
            results[type] = res.data.count
            })
        )
        setCount(results)
    }

    // This is the function to get the snippets
    const GetSnippets = async (type) => {
        try {
            const res = await api.get(`api/snippets/?type=${type || "all"}`)
            const data = res.data?.results ?? res.data
            setSnippets(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
            setSnippets([])
        }
    }

    // Load snippets when type param changes, and load counts on mount
    useEffect(() => {
        GetSnippets(searchParam.get("type"))
        LoadCounts()
    }, [searchParam]) 

    return (
        <div className="flex min-h-screen bg-background">
            <div className="shrink-0">
                <SideBar count={count} refreshCount={LoadCounts} setSnippets={setSnippets} setShowing={setShowing} showing={showing} setIsOpen={setIsOpen}/>
            </div>

            {open && (
                <div>
                    <QuickAddSnippetModal open={open} onClose={onClose} setIsOpen={setIsOpen} setSnippets={setSnippets}></QuickAddSnippetModal> 
                </div>
            )}

            <main className="flex-1">
                <DashboardHeader count={count} showing={showing}/> 
                <StatsBar count={count} />

                <div className="grid gap-4 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {snippets.map((snippet) => (
                        <SnippetCard
                            key={snippet.id}
                            snippet={snippet}
                            onToggleFavorite={toggleFavorite}
                            handleCopy={handleCopy}
                            isCopied={isCopied}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Dashboard