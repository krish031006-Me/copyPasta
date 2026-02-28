import {SideBar} from "../components/SideBar"
import {DashboardHeader} from "../components/DashboardHeader"
import { StatsBar } from "../components/StatsBar"
import { useState } from "react"
import { useSearchParams } from "react-dom"
import { SnippetCard } from "../components/SnippetCard"

function Dashboard(){
    // Using state to store the count and snippets
    const [snippets, setSnippets] = useState([]);
    const [count, setCount] = useState({});
    const [searchParam] = useSearchParams();
        
    // This is the function to get the count
    async function LoadCounts() {
        const types = ["all", "code", "links", "text", "favorites", "recent", "trash"]
        results = {}
        await Promise.all(
            types.map(async (type) => {
            const res = await api.get(`api/snippets/?type=${type}`)
            results[type] = res.data.count
            })
        )
        setCount(results)
    }

    // This is the function to get the snippet
    const GetSnippets = async(type) => { 
        await api.get(`api/snippets/?type=${type}`)  
        .then((res) => res = res.data)
        .then((data) => {setSnippets(data); console.log(data)})
        .catch((err) => alert(err))
    }

    // This is the react function to store all the counts of values in state 
    useEffect(() => {
        GetSnippets(searchParam.get("type")) 
        LoadCounts()
    }, [])
    
    return(
        <div>
            <SideBar count={count} refreshCount={LoadCounts}/>
            <DashboardHeader count={count} /> 
            <StatsBar count={count} /> 
            <SnippetCard snippets={snippets} refreshSnippets={GetSnippets}/>
        </div>
    )
}