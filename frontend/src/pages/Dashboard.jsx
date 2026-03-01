import { SideBar } from "../components/SideBar"
import { DashboardHeader } from "../components/DashboardHeader"
import { StatsBar } from "../components/StatsBar"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { SnippetCard } from "../components/SnippetCard"
import api from "../api"

function Dashboard(){
    // Using state to store the count and snippets
    const [snippets, setSnippets] = useState([]);
    const [count, setCount] = useState({});
    const [searchParam] = useSearchParams();

    // This is the function to toggle the favorite state of a snippet
    const toggleFavorite = async (key) => {
        try {
            const snippet = snippets.find((s) => s.id === key)
            if (!snippet) {
                console.error("Snippet not found")
                return
            }
            const res = await api.patch(`api/snippets/${key}/`, {
                is_favorite: !snippet.is_favorite
            })
            if (res.status === 200) {
                const updated = { ...snippet, is_favorite: !snippet.is_favorite }
                setSnippets((prev) => prev.map((s) => (s.id === key ? updated : s)))
            } else {
                console.error("Failed to update favorite state")
            }
        } catch (err) {
            console.error(err)
        }
    }
        
    // This is the function to get the count
    async function LoadCounts() {
        const types = ["all", "code", "links", "text", "favorites", "recent", "trash"]
        const results = {}
        await Promise.all(
            types.map(async (type) => {
            const res = await api.get(`api/snippets/?type=${type}`)
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
        <div>
            <SideBar count={count} refreshCount={LoadCounts} />
            <DashboardHeader count={count} />
            <StatsBar count={count} />
            {/* This div below is a wrapper to display the snippets in a grid */}
            {/* The grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 is a responsive grid layout */}
            {/* The gap-4 is the gap between the snippets */}
            {/* The p-6 is the padding */}
            {/* The grid-cols-1 is the number of columns in the grid */}
            {/* The sm:grid-cols-2 is the number of columns in the grid on small screens */}
            {/* The lg:grid-cols-3 is the number of columns in the grid on large screens */}
            <div className="grid gap-4 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {snippets.map((snippet) => (
                    <SnippetCard snippet={snippet} onToggleFavorite={toggleFavorite}/>
                ))}
            </div>
        </div>
    )
}

export default Dashboard