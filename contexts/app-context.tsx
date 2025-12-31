"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Language, type Currency, type TranslationKey, translations } from "@/lib/i18n"

// interface User {
//   name: string
//   email: string
//   mobile?: string
//   avatar?: string
//   kycStatus: "pending" | "verified" | "none"
// }
interface User {
  _id: string
  name: string
  email?: string
  phone?: string
  avatar?: string
  walletBalance: number
  kycStatus: "pending" | "verified" | "none"
}


interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  language: Language
  setLanguage: (lang: Language) => void
  currency: Currency
  setCurrency: (curr: Currency) => void
  balance: number
  setBalance: (balance: number) => void
  isLoggedIn: boolean
  login: (method: string) => Promise<void>
  logout: () => void
  t: (key: TranslationKey) => string
  formatCurrency: (amount: number) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [language, setLanguage] = useState<Language>("en")
  const [currency, setCurrency] = useState<Currency>("INR")
  // const [balance, setBalance] = useState(5000)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || (key as string)
  }

  const formatCurrency = (amount: number): string => {
    const formatter = new Intl.NumberFormat(language === "hi" ? "en-IN" : "en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    })
    return formatter.format(amount)
  }

  useEffect(() => {
    const savedLang = localStorage.getItem("app-language") as Language
    const savedCurr = localStorage.getItem("app-currency") as Currency
    const savedUser = localStorage.getItem("app-user")

    if (savedLang) setLanguage(savedLang)
    if (savedCurr) setCurrency(savedCurr)
    if (savedUser && savedUser !== "undefined") {
  try {
    setUser(JSON.parse(savedUser))
    setIsLoggedIn(true)
  } catch (err) {
    localStorage.removeItem("app-user")
  }
}
  }, [])

  // const login = async (method: string) => {
  //   // Simulated login logic
  //   const mockUser: User = {
  //     name: "Cricket Fan",
  //     email: "fan@example.com",
  //     kycStatus: "none",
  //   }
  //   setUser(mockUser)
  //   setIsLoggedIn(true)
  //   localStorage.setItem("app-user", JSON.stringify(mockUser))
  // }



//   const login = async (payload: { user: User }) => {
//   setUser(payload.user)
//   setIsLoggedIn(true)
//   localStorage.setItem("app-user", JSON.stringify(payload.user))
// }




// const login = async (payload: { user: any }) => {
//   const kycStatus =
//     payload.user.kyc?.verified === true
//       ? "verified"
//       : payload.user.kyc
//         ? "pending"
//         : "none"

//   const finalUser = {
//     ...payload.user,
//     kycStatus,
//   }

//   setUser(finalUser)
//   setIsLoggedIn(true)
//   localStorage.setItem("app-user", JSON.stringify(finalUser))
// }


const login = async (userData: any) => {
  if (!userData?._id) {
    console.error("Login failed: invalid user object", userData)
    return
  }

  const kycStatus =
    userData?.kyc?.status ??
    userData?.kycStatus ??
    "none"

  const finalUser: User = {
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    avatar: userData.avatar,
    walletBalance: userData.walletBalance ?? 0,
    kycStatus,
  }

  setUser(finalUser)
  setIsLoggedIn(true)
  localStorage.setItem("app-user", JSON.stringify(finalUser))
}





  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("app-user")
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        language,
        setLanguage: (lang) => {
          setLanguage(lang)
          localStorage.setItem("app-language", lang)
        },
        currency,
        setCurrency: (curr) => {
          setCurrency(curr)
          localStorage.setItem("app-currency", curr)
        },
        isLoggedIn,
        login,
        logout,
        t,
        formatCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
