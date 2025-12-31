"use client"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { TrendingUp, TrendingDown, Clock } from "lucide-react"

interface Bet {
  id: string
  match: string
  team: string
  amount: number
  odds: number
  status: "won" | "lost" | "pending"
  date: string
  potentialWin?: number
}

const mockBets: Bet[] = [
  {
    id: "1",
    match: "IND vs AUS",
    team: "India",
    amount: 1500,
    odds: 1.85,
    status: "won",
    date: "24 Oct, 2024",
    potentialWin: 2775,
  },
  {
    id: "2",
    match: "PAK vs ENG",
    team: "Pakistan",
    amount: 2000,
    odds: 2.1,
    status: "lost",
    date: "23 Oct, 2024",
  },
  {
    id: "3",
    match: "NZ vs SA",
    team: "New Zealand",
    amount: 1000,
    odds: 1.65,
    status: "pending",
    date: "25 Oct, 2024",
    potentialWin: 1650,
  },
  {
    id: "4",
    match: "IND vs PAK",
    team: "India",
    amount: 3000,
    odds: 1.5,
    status: "won",
    date: "20 Oct, 2024",
    potentialWin: 4500,
  },
  {
    id: "5",
    match: "AUS vs ENG",
    team: "England",
    amount: 1200,
    odds: 2.3,
    status: "lost",
    date: "19 Oct, 2024",
  },
]

export function BetHistoryScreen() {
  const { formatCurrency, t } = useApp()
  const [filter, setFilter] = useState<"all" | "won" | "lost" | "pending">("all")

  const filteredBets = filter === "all" ? mockBets : mockBets.filter((bet) => bet.status === filter)

  const stats = {
    totalBets: mockBets.length,
    won: mockBets.filter((b) => b.status === "won").length,
    lost: mockBets.filter((b) => b.status === "lost").length,
    pending: mockBets.filter((b) => b.status === "pending").length,
    totalWagered: mockBets.reduce((sum, b) => sum + b.amount, 0),
    totalWon: mockBets.filter((b) => b.status === "won").reduce((sum, b) => sum + (b.potentialWin || 0), 0),
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t("betHistory")}</h2>
        <p className="text-sm text-muted-foreground">Track all your betting activity</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-2xl border-primary/20">
          <p className="text-xs text-muted-foreground mb-1">Total Wagered</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(stats.totalWagered)}</p>
        </div>
        <div className="glass p-4 rounded-2xl border-green-500/20">
          <p className="text-xs text-muted-foreground mb-1">Total Won</p>
          <p className="text-2xl font-bold text-green-500">{formatCurrency(stats.totalWon)}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <FilterChip label="All" count={stats.totalBets} active={filter === "all"} onClick={() => setFilter("all")} />
        <FilterChip label={t("success")} count={stats.won} active={filter === "won"} onClick={() => setFilter("won")} />
        <FilterChip
          label={t("failed")}
          count={stats.lost}
          active={filter === "lost"}
          onClick={() => setFilter("lost")}
        />
        <FilterChip
          label={t("pending")}
          count={stats.pending}
          active={filter === "pending"}
          onClick={() => setFilter("pending")}
        />
      </div>

      <div className="space-y-3">
        {filteredBets.map((bet) => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>
    </div>
  )
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
        active ? "bg-primary text-primary-foreground" : "glass bg-transparent"
      }`}
    >
      {label} ({count})
    </button>
  )
}

function BetCard({ bet }: { bet: Bet }) {
  const { formatCurrency } = useApp()

  const statusConfig = {
    won: {
      icon: TrendingUp,
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-500",
      label: "Won",
    },
    lost: {
      icon: TrendingDown,
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-500",
      label: "Lost",
    },
    pending: {
      icon: Clock,
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-500",
      label: "Pending",
    },
  }

  const config = statusConfig[bet.status]
  const Icon = config.icon

  return (
    <div className={`glass p-4 rounded-2xl border ${config.border}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-bold text-sm">{bet.match}</p>
          <p className="text-xs text-muted-foreground">Bet on {bet.team}</p>
        </div>
        <div className={`${config.bg} px-3 py-1 rounded-full flex items-center gap-1.5`}>
          <Icon className={`w-3.5 h-3.5 ${config.text}`} />
          <span className={`text-xs font-bold ${config.text}`}>{config.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase">Amount</p>
          <p className="font-bold text-sm">{formatCurrency(bet.amount)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase">Odds</p>
          <p className="font-bold text-sm text-primary">{bet.odds}x</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase">{bet.status === "won" ? "Won" : "Potential"}</p>
          <p className={`font-bold text-sm ${bet.status === "won" ? "text-green-500" : ""}`}>
            {bet.potentialWin ? formatCurrency(bet.potentialWin) : "-"}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/50">
        <p className="text-[10px] text-muted-foreground">{bet.date}</p>
      </div>
    </div>
  )
}
