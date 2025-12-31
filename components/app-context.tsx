"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "en" | "hi"
type Currency = "INR" | "USD" | "EUR" | "GBP"

interface AppContextType {
  language: Language
  setLanguage: (lang: Language) => void
  currency: Currency
  setCurrency: (curr: Currency) => void
  t: (key: string) => string
  formatCurrency: (amount: number) => string
}

const translations = {
  en: {
    home: "Home",
    matches: "Matches",
    wallet: "Wallet",
    refer: "Refer",
    profile: "Profile",
    live: "Live",
    upcoming: "Upcoming",
    completed: "Completed",
    deposit: "Deposit",
    withdraw: "Withdraw",
    balance: "Total Balance",
    winnings: "Winnings",
    bonus: "Bonus",
    kyc_status: "KYC Status",
    verified: "Verified",
    pending: "Pending",
    unverified: "Unverified",
    bet_history: "Bet History",
    settings: "Settings",
    logout: "Logout",
    add_money: "Add Money",
    refer_earn: "Refer & Earn",
  },
  hi: {
    home: "होम",
    matches: "मैच",
    wallet: "वॉलेट",
    refer: "रेफर",
    profile: "प्रोफ़ाइल",
    live: "लाइव",
    upcoming: "आगामी",
    completed: "पूरा हुआ",
    deposit: "जमा",
    withdraw: "निकासी",
    balance: "कुल शेष",
    winnings: "जीत",
    bonus: "बोनस",
    kyc_status: "KYC स्थिति",
    verified: "सत्यापित",
    pending: "लंबित",
    unverified: "असत्यापित",
    bet_history: "बेट इतिहास",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",
    add_money: "पैसे जोड़ें",
    refer_earn: "रेफर और कमाएं",
  },
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [currency, setCurrency] = useState<Currency>("INR")

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  const formatCurrency = (amount: number) => {
    const symbols = { INR: "₹", USD: "$", EUR: "€", GBP: "£" }
    const rates = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0094 }
    const converted = amount * rates[currency]
    return `${symbols[currency]}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <AppContext.Provider value={{ language, setLanguage, currency, setCurrency, t, formatCurrency }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error("useAppContext must be used within AppProvider")
  return context
}
