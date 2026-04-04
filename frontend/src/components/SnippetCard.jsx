// This component is used to display only one snippet individually 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // VS Code Dark Theme
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

export default function SnippetCard({ snippet, onToggleFavorite, handleCopy, isCopied, handleDelete}) {
  
  const categoryConfig = {
    code: {
      icon: Code2,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    link: {
      icon: Link2,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
      borderColor: "border-chart-2/20",
    },
    text: {
      icon: FileText,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
      borderColor: "border-chart-5/20",
    },
  }

  const config =
    categoryConfig[snippet.content_type] ?? categoryConfig.text
  const Icon = config.icon

  let link = undefined
  if(snippet.content_type === "link"){
    link = snippet.code
  }
  
  
  const date = new Date(snippet.updated_at);
  const actualDate = date.toLocaleDateString("en-US", {
    month: "short",  
    day: "numeric",  
    year: "numeric", 
    hour: "2-digit", 
    minute: "2-digit"
  });
  
  
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border bg-card p-4 transition-all duration-200",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        config.borderColor // Placeholder border color
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              config.bgColor // Placeholder background color
            )}
          >
            <Icon className={cn("h-4 w-4", config.color)} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">
              { snippet.title }
            </h3>
            <p className="text-xs text-muted-foreground">
              { actualDate } 
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className={cn(
                  "rounded-md p-1.5 transition-colors opacity-0 group-hover:opacity-100",
                  !snippet.is_favorite &&
                    "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => onToggleFavorite(snippet.id)}
              >
                <Star
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 transition-colors",
                    snippet.is_favorite
                      ? "fill-amber-400 text-amber-400"
                      : "fill-transparent text-muted-foreground"
                  )}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {snippet.is_favorite ? "Remove from favorites" : "Add to favorites"}
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
              <DropdownMenuItem onClick={()=>handleCopy(snippet.code)} disabled={isCopied}>
                <Copy className="mr-2 h-3.5 w-3.5" /> 
                Copy 
              </DropdownMenuItem>
              
              {/* Optional: External Link Item */}
              {link && (
                <DropdownMenuItem asChild>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  Open Link
                </a>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handleDelete(snippet.id)}
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
        <div className="line-clamp-4 whitespace-pre-wrap break-all">
          { snippet.content_type === "code" ? (
            <SyntaxHighlighter
              language={snippet.language || "text"}
              style={vscDarkPlus}
              showLineNumbers={true}> 
              { snippet.code }
            </SyntaxHighlighter> 
          ) : (
            snippet.code
          )}
        </div>
      </div> 

      {/* Tags */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {
          snippet.badges.map((badge) => {
            snippet.language === badge ? (
              <Badge
                variant="outline"
                className={cn(
                  "rounded-md px-2 py-0 text-[10px] font-medium",
                  "text-primary border-primary/20"
                )}
              >
                { badge }
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="rounded-md bg-secondary text-muted-foreground px-2 py-0 text-[10px] font-medium"
              >
                { badge }
              </Badge>
            )
          })
        }
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-[10px] text-muted-foreground">
          { actualDate }
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
                "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              disabled={isCopied}
              onClick={() => handleCopy(snippet.code)}
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