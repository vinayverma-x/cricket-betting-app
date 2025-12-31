"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useApp } from "@/contexts/app-context"

export function HomeScreen() {
  const { t } = useApp()

  return (
    <div className="p-4 space-y-6">
      {/* Live Matches Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {t("live")} {t("matches")}
          </h2>
          <Badge variant="outline" className="text-primary border-primary animate-pulse">
            ● LIVE
          </Badge>
        </div>

        <div className="space-y-4">
          <MatchCard
            teamA={{ name: "India", flag: "🇮🇳" }}
            teamB={{ name: "Australia", flag: "🇦🇺" }}
            league="T20 World Cup"
            odds={{ teamA: "1.45", teamB: "2.80" }}
            live
          />
          <MatchCard
            teamA={{ name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }}
            teamB={{ name: "Pakistan", flag: "🇵🇰" }}
            league="ODI Series"
            odds={{ teamA: "1.90", teamB: "1.90" }}
            live
          />
        </div>
      </section>

      {/* Popular Leagues */}
      <section>
        <h2 className="text-xl font-bold mb-4">{t("popularLeagues")}</h2>
        <div className="grid grid-cols-2 gap-3">
          {["IPL 2024", "Big Bash", "PSL", "The Hundred"].map((league) => (
            <div
              key={league}
              className="glass p-4 rounded-2xl flex items-center justify-between hover:border-primary/50 transition-colors"
            >
              <span className="font-bold text-sm">{league}</span>
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <Card className="glass overflow-hidden relative h-32 border-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="relative z-10 p-6 flex flex-col justify-center h-full">
          <h3 className="text-lg font-bold">Weekend Bonanza</h3>
          <p className="text-sm text-muted-foreground">Get 10% Extra Cash on all IPL deposits</p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      </Card>
    </div>
  )
}

function MatchCard({ teamA, teamB, league, odds, live }: any) {
  const { t } = useApp()

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="glass p-4 rounded-3xl relative overflow-hidden group">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{league}</span>
        {live && (
          <span className="text-[10px] font-black text-red-500 flex items-center gap-1 animate-pulse">
            {t("live").toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex flex-col items-center flex-1">
          <span className="text-3xl mb-2">{teamA.flag}</span>
          <span className="font-bold text-sm">{teamA.name}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs font-bold text-muted-foreground mb-1">VS</div>
          <div className="w-8 h-[1px] bg-border" />
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="text-3xl mb-2">{teamB.flag}</span>
          <span className="font-bold text-sm">{teamB.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="h-10 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/20 transition-all flex flex-col items-center justify-center">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Odds</span>
          <span className="text-sm font-black text-primary">{odds.teamA}</span>
        </button>
        <button className="h-10 rounded-xl border border-secondary/20 bg-secondary/5 hover:bg-secondary/20 transition-all flex flex-col items-center justify-center">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Odds</span>
          <span className="text-sm font-black text-secondary">{odds.teamB}</span>
        </button>
      </div>
    </motion.div>
  )
}
