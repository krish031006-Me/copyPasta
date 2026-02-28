// Removed 'useState' since logic is stripped
import {
  Copy,
  Star,
  Trash2,
  MoreHorizontal,
  Code2,
  Link2,
  FileText,
  Check,
  ExternalLink,
} from "lucide-react"
import { cn } from "../lib/utils"
import { Badge } from "./ui/badge.jsx"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/ToolTip.jsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu.jsx"

export function SnippetCard({ snippets, refreshSnippets }) {
  
  // -----------------------------------------------------------------------
  // TODO: WRITE YOUR LOGIC HERE
  // 1. Accept props (e.g. { snippet, onCopy, onDelete })
  // 2. Define your category colors/icons map
  // 3. Handle state (e.g. isCopied, isFavorite)
  // -----------------------------------------------------------------------

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border bg-card p-4 transition-all duration-200",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "border-primary/20" // Placeholder border color
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              "bg-primary/10" // Placeholder background color
            )}
          >
            {/* Replace Code2 with dynamic Icon based on category */}
            <Code2 className={cn("h-4 w-4", "text-primary")} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">
              Snippet Title {/* Placeholder Title */}
            </h3>
            <p className="text-xs text-muted-foreground">
              Oct 24, 2024 {/* Placeholder Date */}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "rounded-md p-1.5 transition-colors",
                  "text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground"
                )}
              >
                <Star className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              Add to favorites
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-colors group-hover:opacity-100 hover:text-foreground">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 bg-popover text-popover-foreground"
            >
              <DropdownMenuItem>
                <Copy className="mr-2 h-3.5 w-3.5" />
                Copy
              </DropdownMenuItem>
              
              {/* Optional: External Link Item */}
              <DropdownMenuItem asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  Open Link
                </a>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content Preview */}
      <div
        className={cn(
          "mb-3 flex-1 rounded-lg p-3 text-xs leading-relaxed",
          "bg-background font-mono text-muted-foreground"
        )}
      >
        <p className="line-clamp-4 whitespace-pre-wrap break-all">
          console.log("Hello World"); {/* Placeholder Content */}
        </p>
      </div>

      {/* Tags */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {/* Blueprint: A single Tag Badge */}
        <Badge
          variant="secondary"
          className="rounded-md bg-secondary text-muted-foreground px-2 py-0 text-[10px] font-medium"
        >
          React {/* Placeholder Tag */}
        </Badge>
        
        {/* Blueprint: Language Badge */}
        <Badge
          variant="outline"
          className={cn(
            "rounded-md px-2 py-0 text-[10px] font-medium",
            "text-primary border-primary/20"
          )}
        >
          javascript {/* Placeholder Language */}
        </Badge>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-[10px] text-muted-foreground">
          Copied 12 times {/* Placeholder Count */}
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
                "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Copy className="h-3 w-3" />
              Copy
            </button>
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}