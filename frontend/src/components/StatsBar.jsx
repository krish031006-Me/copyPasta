"use client"

import { Clipboard, Code2, Link2, FileText } from "lucide-react"
import { cn } from "@/lib/utils" 
import { useState, useEffect } from "react"

export function StatsBar({ count, refreshCount }){ 

    // We need to get the percentage of the snippets
    const[part, setPart] = useState({})
    const [extra, setExtra] = useState(0)

    useEffect(() => {
        if (!count || !count.all) return 

        setExtra((prev) => prev+1) // better way to change the state

        const results = {}
        const types = ["codes", "links", "texts"]

        types.forEach((type) => {
            const value = count[type] || 0
            results[type] = (value/count["all"]) * 100
        }) 

        setPart(results) 
    }, [count])

    const stats = [
        {
            "label":"Total Snippets",
            "value":count["all"],
            "change":extra,
            "icon":Clipboard,
            "color":"text-primary",
            "bgColor":"bg-primary/10"
        },
        {
            "label":"Codes",
            "value":count["codes"],
            "name":"codes",
            "icon":Code2,
            "color":"text-primary",
            "bgColor":"bg-primary/10"
        },
        {
            "label":"Links",
            "value":count["links"],
            "name":"links",
            "icon":Link2,
            "color":"text-chart-2",
            "bgColor":"bg-chart-2/10"
        },
        {
            "label":"Texts",
            "value":count["texts"],
            "name":"texts",
            "icon":FileText,
            "color":"text-chart-5",
            "bgColor":"bg-chart-5/10"
        } 
    ]

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
                    <span className="text-primary/70">{stat.label === "Total Snippets" ? `+${stat.change} today` : `${(part[stat.name] ?? 0).toFixed(1)}`}</span> 
                </p>
                </div> 
            </div>
            )
        })}
        </div>
    )
}