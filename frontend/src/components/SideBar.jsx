"use client"

import {
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
        <button
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
            "bg-accent text-accent-foreground"
          )}
        >
          <Layers className="h-4 w-4 shrink-0 text-primary" />
          <span className="flex-1 text-left">All Snippets</span>
          <Badge
            variant="secondary"
            className="h-5 min-w-5 justify-center rounded-md text-[10px] font-semibold bg-primary/15 text-primary"
          >
            24
          </Badge>
        </button>

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
