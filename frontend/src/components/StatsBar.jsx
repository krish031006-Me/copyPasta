"use client"

import { Clipboard, Code2, Link2, FileText } from "lucide-react"
import { cn } from "@/lib/utils" 

export function StatsBar() {
  // -----------------------------------------------------------------------
  // TODO: WRITE YOUR LOGIC HERE
  // 1. Fetch data from your API or database
  // 2. Process the data to match the UI structure
  // -----------------------------------------------------------------------
  
  // For the JSX below to work, your logic needs to produce an array 
  // named 'stats' with this shape:
  // { 
  //   label: string, 
  //   value: string|number, 
  //   change: string, 
  //   icon: LucideIcon, 
  //   color: string (tailwind class), 
  //   bgColor: string (tailwind class) 
  // }

  const stats = [] // <--- Populate this array with your dynamic data

  return (
    <div className="grid grid-cols-2 gap-3 px-6 py-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/20"
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                stat.bgColor
              )}
            >
              <Icon className={cn("h-5 w-5", stat.color)} />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">
                {stat.label}{" "}
                <span className="text-primary/70">{stat.change}</span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}