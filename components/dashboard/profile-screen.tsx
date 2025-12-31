"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShieldCheck, Settings, LogOut, ChevronRight, History, FileText, HelpCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { useRouter } from "next/navigation"

export function ProfileScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const { user, logout, t } = useApp()
  const router = useRouter()

const [pan, setPan] = useState("")
const [aadhaar, setAadhaar] = useState("")
const [bankAccount, setBankAccount] = useState("")
const [ifsc, setIfsc] = useState("")
const [loading, setLoading] = useState(false)


  const handleLogout = () => {
    logout()
    router.push("/")
  }


  const handleSubmitKYC = async () => {
  try {
    setLoading(true)

    const res = await fetch("/api/kyc/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?._id,
        pan,
        aadhaar,
        bankAccount,
        ifsc,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message)
      return
    }

    alert("KYC submitted. Verification pending.")
  } finally {
    setLoading(false)
  }
}


  if (!user) return null

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="w-20 h-20 border-4 border-primary/20">
          <AvatarImage src="/profile-user.png" />
          <AvatarFallback className="text-2xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            {user.name}
            {user.kycStatus === "verified" && <ShieldCheck className="w-5 h-5 text-primary" />}
          </h2>
          <p className="text-sm text-muted-foreground">{user.phone}</p>
          <div
            className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
              user.kycStatus === "verified"
                ? "bg-green-500/10 border border-green-500/20 text-green-500"
                : user.kycStatus === "pending"
                  ? "bg-amber-500/10 border border-amber-500/20 text-amber-500"
                  : "bg-red-500/10 border border-red-500/20 text-red-500"
            }`}
          >
            KYC {t(user.kycStatus === "not_submitted" ? "notSubmitted" : user.kycStatus)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <ProfileItem icon={Settings} label={t("settings")} onClick={() => onNavigate("settings")} />
        <ProfileItem icon={History} label={t("betHistory")} onClick={() => onNavigate("betHistory")} />
        <ProfileItem icon={FileText} label="KYC Verification" onClick={() => onNavigate("kyc")} />
        <ProfileItem icon={HelpCircle} label="Help & Support" />
      </div>

      <Button
        onClick={handleLogout}
        variant="destructive"
        className="w-full h-12 rounded-2xl gap-2 font-bold bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20 mt-4"
      >
        <LogOut className="w-5 h-5" /> {t("logout")}
      </Button>

      <div className="text-center pt-8">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">CricBet App v2.4.0</p>
      </div>
    </div>
  )
}

function ProfileItem({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full glass p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <span className="font-bold text-sm">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  )
}
