import {SideBar} from "../components/SideBar"
import {DashboardHeader} from "../components/DashboardHeader"
import { StatsBar } from "../components/StatsBar"

function Dashboard(){
    // Using state to store the count
    const [count, setCount] = useState({})
        
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

    // This is the react function to store all the counts of values in state 
    useEffect(() => {
        LoadCounts()
    }, [])
    
    return(
        <div>
            <SideBar count={count} refreshCount={LoadCounts}/>
            <DashboardHeader count={count} /> 
            <StatsBar count={count} /> 
        </div>
    )
}