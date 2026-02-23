"use client"

import { useState } from "react"

import api from "../api"

import {
  Code2,
  Link2,
  FileText,
  Clock,
  Layers,
  Star,
  Trash2,
  ClipboardPaste,
  Plus,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// This is the function to get the snippet count
const getSnippetCount = async (sortBy) => {
  await api.get("api/snippets/") 
  .then((res) => res = res.data)
  .catch((err) => {
    console.log(err)
  })

  // getting the count
  if (sortBy === "all"){
    return res.data.count
  }else{
    // we wanna get only the results with out content_type
    count = 0
    (res.data.results).forEach((result) => {
      if (result.content_type === sortBy){
        count ++;
      }
    });
    return count
  }
}

// This is the function to get flag count
const flagCount = async(flag) => {
  await api.get(`api/snippets/?type=${flag}/`)
  .then((res) => res = res.data.count) 
  .catch((err) => {
    console.log(err)
  })
  return res
}

// The react states used in the sidebar
const [categories, setCategories] = useState([
  {"name": "All Snippets", "logo": Layers, "count": getSnippetCount("all")},
  {"name": "Code", "logo": Code2, "count": getSnippetCount("code")},
  {"name": "Links", "logo": Link2, "count": getSnippetCount("links")},
  {"name": "Text", "logo": FileText, "count": getSnippetCount("text")}
]);

const [collections, setCollections] = useState([ 
  {"name": "Favorites", "logo": Star, "count": flagCount("favorites")},
  {"name": "Recent", "logo": Clock, "count": flagCount("recent")},
  {"name": "Trash", "logo": Trash2, "count": flagCount("trash")}
]) 

export function AppSidebar() { 
  return (
    <aside 
      className={cn(
        "flex h-full flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300",
        "w-64"
      )}
    >
      {/* Logo */} 
      <div className="flex items-center gap-3 border-b border-border px-5 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
          <ClipboardPaste className="h-5 w-5 text-primary-foreground" /> 
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-foreground">
            Copy Pasta
          </h1>
          <p className="text-xs text-muted-foreground">Clipboard Manager</p>
        </div>
      </div>

      {/* New Snippet Button */}
      <div className="px-3 pt-4 pb-2">
        <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Snippet
        </Button>
      </div>

      {/* Static nav items */}
      <nav className="flex-1 space-y-1 px-3 pt-2">
        <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Categories
        </p>
        
        {categories.map((category) => {
          const Logo = category.logo
          return(
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                "bg-accent text-accent-foreground"
              )}
            >
              <Logo className="h-4 w-4 shrink-0 text-primary" />
              <span className="flex-1 text-left">{category.name}</span>
              <Badge
                variant="secondary"
                className="h-5 min-w-5 justify-center rounded-md text-[10px] font-semibold bg-primary/15 text-primary"
              >
                {category.count} 
              </Badge> 
            </button> 
          )
        })}

        <div className="py-3">
          <div className="h-px bg-border" />
        </div>

        <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Collections
        </p>
        
        <button
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
            "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          )}
        >
          <Star className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 text-left">Favorites</span>
          <Badge
            variant="secondary"
            className="h-5 min-w-5 justify-center rounded-md text-[10px] font-semibold bg-secondary text-muted-foreground"
          >
            6
          </Badge>
        </button>
        <button
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
            "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          )}
        >
          <Trash2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 text-left">Trash</span>
          <Badge
            variant="secondary"
            className="h-5 min-w-5 justify-center rounded-md text-[10px] font-semibold bg-secondary text-muted-foreground"
          >
            2
          </Badge>
        </button>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-accent/50 hover:text-foreground">
          <Settings className="h-4 w-4 shrink-0" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  )
}
