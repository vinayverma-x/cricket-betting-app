"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Trophy, Wallet, Users, User, Bell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HomeScreen } from "@/components/dashboard/home-screen"
import { MatchesScreen } from "@/components/dashboard/matches-screen"
import { WalletScreen } from "@/components/dashboard/wallet-screen"
import { ReferScreen } from "@/components/dashboard/refer-screen"
import { ProfileScreen } from "@/components/dashboard/profile-screen"
import { BetHistoryScreen } from "@/components/dashboard/bet-history-screen"
import { SettingsScreen } from "@/components/dashboard/settings-screen"
import { KYCScreen } from "@/components/dashboard/kyc-screen"
import { useApp } from "@/contexts/app-context"

type Tab = "home" | "matches" | "wallet" | "refer" | "profile"
type SubScreen = "betHistory" | "settings" | "kyc" | null

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [subScreen, setSubScreen] = useState<SubScreen>(null)
  const { formatCurrency, user, t } = useApp()

  const handleNavigate = (screen: string) => {
    setSubScreen(screen as SubScreen)
  }

  const handleBack = () => {
    setSubScreen(null)
  }

  return (
    <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
      {/* Top Header */}
      <header className="px-4 py-3 flex items-center justify-between border-b border-border/40 backdrop-blur-lg sticky top-0 z-20 bg-background/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight">CRICBET</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 border-primary/20">
            <span className="text-xs font-bold text-primary">{formatCurrency(0).charAt(0)}</span>
            {/* <span className="text-sm font-bold">{formatCurrency(user?.balance || 0).slice(1)}</span> */}
            <span className="text-sm font-bold">
  {formatCurrency(user?.walletBalance || 0).slice(1)}
</span>

            <button className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={subScreen || activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {subScreen === "betHistory" ? (
              <div>
                <button onClick={handleBack} className="px-4 py-2 text-primary font-bold">
                  ← Back
                </button>
                <BetHistoryScreen />
              </div>
            ) : subScreen === "settings" ? (
              <div>
                <button onClick={handleBack} className="px-4 py-2 text-primary font-bold">
                  ← Back
                </button>
                <SettingsScreen />
              </div>
            ) : subScreen === "kyc" ? (
              <div>
                <button onClick={handleBack} className="px-4 py-2 text-primary font-bold">
                  ← Back
                </button>
                <KYCScreen />
              </div>
            ) : (
              <>
                {activeTab === "home" && <HomeScreen />}
                {activeTab === "matches" && <MatchesScreen />}
                {activeTab === "wallet" && <WalletScreen />}
                {activeTab === "refer" && <ReferScreen />}
                {activeTab === "profile" && <ProfileScreen onNavigate={handleNavigate} />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 glass border-t border-white/5 flex items-center justify-around px-2 z-30 pb-4">
        <NavButton active={activeTab === "home"} onClick={() => setActiveTab("home")} icon={Home} label={t("home")} />
        <NavButton
          active={activeTab === "matches"}
          onClick={() => setActiveTab("matches")}
          icon={Trophy}
          label={t("matches")}
        />
        <NavButton
          active={activeTab === "wallet"}
          onClick={() => setActiveTab("wallet")}
          icon={Wallet}
          label={t("wallet")}
        />
        <NavButton
          active={activeTab === "refer"}
          onClick={() => setActiveTab("refer")}
          icon={Users}
          label={t("refer")}
        />
        <NavButton
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
          icon={User}
          label={t("profile")}
        />
      </nav>
    </div>
  )
}

function NavButton({
  active,
  onClick,
  icon: Icon,
  label,
}: { active: boolean; onClick: () => void; icon: React.ElementType; label: string }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all">
      <div
        className={`relative p-2 rounded-xl transition-all duration-300 ${active ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
      >
        {active && (
          <motion.div
            layoutId="nav-active"
            className="absolute inset-0 bg-primary/10 rounded-xl neon-glow"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <Icon className={`w-6 h-6 relative z-10 transition-transform ${active ? "scale-110" : ""}`} />
      </div>
      <span
        className={`text-[10px] font-bold uppercase tracking-wider ${active ? "text-primary" : "text-muted-foreground"}`}
      >
        {label}
      </span>
    </button>
  )
}
