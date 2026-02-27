"use client"

import { useState, useEffect, useEffectEvent } from "react"
import {useSeachParams} from "react-router"
import api from "../api"

import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react"
import { cn } from "../lib/utils.js"
import { Input } from "./ui/input.jsx"
import { Badge } from "./ui/badge.jsx"

/*
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
*/

export default function DashboardHeader({ count, refreshCount }) {

  // Using state to store query, results
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchParams] = useSeachParams();
  // Using useEffect to control searching
  useEffect(() => {
    // to avoid running without a query
    if (!query){
      setResults([])
      return;
    }

    // for abortion of processes
    const controller = new AbortController()

    // the function to fetch the results
    const fetchResults = async () => {
      const type = searchParams.get("type");
      try{
        const response = await api.get(`api/snippets/?type=${type}`, {
          params: query,
          signal: controller.signal // sending the signal with the request
        })

        setResults(response.data)
      }catch(err){
        if (err.name === "CanceledError" || err.name === "ERR_CANCELED"){
          console.log("Request cancelled")
        }else{
          console.log("internal search error")
        }
      }
    };
    
    // The fucntion to call fetchResults
    const timeoutId = setTimeout(() => {
      fetchResults()
    },500)

    // the cleanup return statement
    return () => {
      clearTimeout(timeoutId);
      controller.abort(); // aborting the process before starting a new one
    }

  }, query);
  
  // Using the state to store the labels on dashbaord
  const labels = useState([
    {"name":"All Snippets", "url": "all"},
    {"name":"Codes", "url": "codes"},
    {"name":"Links", "url": "links"},
    {"name":"Texts", "url": "texts"},
    {"name":"Favorites", "url": "favorites"},
    {"name":"Trash", "url": "trash"},
    {"name":"Recent", "url": "recent"}
  ])
  
  return (
    <header className="flex flex-col gap-4 border-b border-border bg-card px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
      {labels.map((label) => {

        return (
          <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {label.name}
              </h2>
              <Badge
              variant="secondary"
              className="rounded-md bg-primary/10 text-primary text-xs font-semibold"
              >
              {count[label.url]}
              </Badge>
          </div>
        )
      })}

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> 
          <Input
            type="text"
            placeholder="Search your library"
            className="h-9 bg-background pl-9 text-sm text-foreground placeholder:text-muted-foreground"
            value={query}
            onChange={(e) => {setQuery(e.target.value)}} // setting the value
          />
        </div> 

        {/* Filter Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Filters</TooltipContent>
        </Tooltip>

        {/* View Toggle */}
        <div className="flex h-9 items-center rounded-md border border-border bg-background p-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              {/* Active State (Grid) */}
              <button
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                  "bg-accent text-foreground"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Grid view</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              {/* Inactive State (List) */}
              <button
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>List view</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}