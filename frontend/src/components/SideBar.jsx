"use client"

import { useState, useEffect } from "react"

import {Link} from "react-router"

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
import { cn } from "../lib/utils.js"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AppSidebar({ count, refreshCount }) { 

  // The react states used in the sidebar
  const [categories, setCategories] = useState([
    {"name": "All Snippets", "logo": Layers, "link": "all"},
    {"name": "Code", "logo": Code2, "link": "code"},
    {"name": "Links", "logo": Link2, "link": "links"},
    {"name": "Text", "logo": FileText, "link": "text"}
  ]);

  const [collections, setCollections] = useState([ 
    {"name": "Favorites", "logo": Star,  "link": "favorites"},
    {"name": "Recent", "logo": Clock, "link": "recent"},
    {"name": "Trash", "logo": Trash2, "link": "trash"}
  ]) 

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
          <Link to="/">
            <h1 className="text-base font-semibold tracking-tight text-foreground cursor-pointer">
              Copy Pasta
            </h1>
          </Link>
          <p className="text-xs text-muted-foreground">Clipboard Manager</p>
        </div>
      </div>

      {/* New Snippet Button */}
      <div className="px-3 pt-4 pb-2">
        <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
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
          const link = category.link !== "all" ? `/api/snippets/type=?${category.link}` : "/api/snippets/"
          return(
            <Link to={link}>
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer",
                  "bg-accent text-accent-foreground"
                )}
              >
                <Logo className="h-4 w-4 shrink-0 text-primary" />
                <span className="flex-1 text-left">{category.name}</span>
                <Badge
                  variant="secondary"
                  className="h-5 min-w-5 justify-center rounded-md text-[10px] font-semibold bg-primary/15 text-primary"
                >
                  {count[category.name]} 
                </Badge> 
              </button> 
            </Link>
          )
        })}

        <div className="py-3">
          <div className="h-px bg-border" />
        </div>

        <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Collections
        </p>
        { collections.map((flag) => {
          const Logo = flag.logo
          const link = `api/snippets/?type=${flag.link}`
          return (
            <Link to={link}>
              <button
                className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer",
                "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Logo className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 text-left">{ flag.name }</span>
                <Badge
                  variant="secondary"
                  className="h-5 min-w-5 justify-center rounded-md text-[10px] font-semibold bg-secondary text-muted-foreground"
                >
                  {flag.count}
                </Badge>
              </button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-accent/50 hover:text-foreground cursor-pointer">
          <Settings className="h-4 w-4 shrink-0" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  )
}

export default SideBar