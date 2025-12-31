"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MatchesScreen() {
  const [filter, setFilter] = useState("live")

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Matches</h2>

      <Tabs defaultValue="live" className="w-full" onValueChange={setFilter}>
        <TabsList className="w-full glass bg-transparent h-12 p-1 rounded-2xl grid grid-cols-3">
          <TabsTrigger
            value="live"
            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
          >
            Live
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
          >
            Finished
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4 pt-2">
        {filter === "live" && (
          <>
            <SimpleMatchCard teamA="IND" teamB="AUS" time="LIVE" odds1="1.45" odds2="2.80" league="World Cup T20" />
            <SimpleMatchCard teamA="ENG" teamB="PAK" time="LIVE" odds1="1.90" odds2="1.90" league="ODI Series" />
          </>
        )}
        {filter === "upcoming" && (
          <>
            <SimpleMatchCard
              teamA="SA"
              teamB="NZ"
              time="Tomorrow, 14:00"
              odds1="2.10"
              odds2="1.75"
              league="Test Match"
            />
            <SimpleMatchCard
              teamA="BAN"
              teamB="SL"
              time="24 Oct, 18:30"
              odds1="2.50"
              odds2="1.55"
              league="T20 Series"
            />
          </>
        )}
        {filter === "completed" && (
          <div className="text-center py-12 opacity-50">
            <p className="text-sm">No recent matches found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SimpleMatchCard({ teamA, teamB, time, odds1, odds2, league }: any) {
  return (
    <div className="glass p-4 rounded-3xl space-y-4">
      <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        <span>{league}</span>
        <span className={time === "LIVE" ? "text-red-500 animate-pulse" : ""}>{time}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full glass flex items-center justify-center font-bold text-xs">{teamA}</div>
          <span className="font-black text-lg">VS</span>
          <div className="w-10 h-10 rounded-full glass flex items-center justify-center font-bold text-xs">{teamB}</div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold text-sm">
            {odds1}
          </button>
          <button className="px-4 py-2 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary font-bold text-sm">
            {odds2}
          </button>
        </div>
      </div>
    </div>
  )
}
