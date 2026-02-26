"use client"

import { useState } from "react"

import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

/*
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
*/

// Using the state to store the labels on dashbaord
const labels = useState([
    {"name":"All Snippets"},
    {"name":"Codes"},
    {"name":"Links"},
    {"name":"Texts"},
    {"name":"Favorites"},
    {"name":"Trash"},
    {"name":"Recent"}
])

export default function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-border bg-card px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          All Snippets
        </h2>
        <Badge
          variant="secondary"
          className="rounded-md bg-primary/10 text-primary text-xs font-semibold"
        >
          12
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search snippets..."
            className="h-9 bg-background pl-9 text-sm text-foreground placeholder:text-muted-foreground"
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