"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Phone, Mail, Lock, User, MessageCircle } from "lucide-react"
import { useApp } from "@/contexts/app-context"

type AuthMode = "login" | "signup" | "otp"

export function AuthScreen({ onComplete }: { onComplete: () => void }) {
  const [mode, setMode] = useState<AuthMode>("login")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [authProvider, setAuthProvider] = useState<"google" | "microsoft" | "email" | null>(null)
  const [otp, setOtp] = useState("")
  const [tempUser, setTempUser] = useState<any>(null)


  const { login, language, setLanguage, t } = useApp()



  useEffect(() => {
  if (mode === "otp" && tempUser?.userId) {
    fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: tempUser.userId }),
    })
  }
}, [mode, tempUser])

  const handleAuth = () => {
    setIsLoading(true)
    setTimeout(() => {
      if (mode === "login" || mode === "signup") {
        setMode("otp")
      } else {
        login({
          name: formData.name || "Demo User",
          email: formData.email || "demo@cricbet.app",
          phone: formData.phone || "+91 98765 43210",
          balance: 50000,
          kycStatus: "pending",
          provider: authProvider,
        })
        onComplete()
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleOAuthLogin = (provider: "google" | "microsoft") => {
    setAuthProvider(provider)
    setIsLoading(true)
    setTimeout(() => {
      login({
        name: provider === "google" ? "Google User" : "Microsoft User",
        email: `user@${provider}.com`,
        phone: "+91 98765 43210",
        balance: 50000,
        kycStatus: "verified",
        provider,
      })
      onComplete()
      setIsLoading(false)
    }, 1500)
  }


  const handleVerifyOTP = async () => {
  try {
    setIsLoading(true)

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: tempUser.userId,
        otp,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message)
      return
    }

    login(data.user)
    onComplete()
 
  } catch {
    alert("OTP verification failed")
  } finally {
    setIsLoading(false)
  }
}


  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  const handleSignupAPI = async () => {
  try {
    setIsLoading(true)

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message || "Signup failed")
      return
    }

    // after successful signup → go to login screen
    setMode("login")
  } catch (err) {
    alert("Something went wrong")
  } finally {
    setIsLoading(false)
  }
}

const handleLoginAPI = async () => {
  try {
    setIsLoading(true)

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: formData.email, // email OR phone
        password: formData.password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message || "Login failed")
      return
    }

    // store user temporarily until OTP verified
    setTempUser(data)

    // move to OTP screen
    setMode("otp")
  } catch (err) {
    alert("Something went wrong")
  } finally {
    setIsLoading(false)
  }
}



  return (
    <div className="h-full w-full bg-background p-6 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        {mode !== "login" ? (
          <Button variant="ghost" size="icon" onClick={() => setMode("login")}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
        ) : (
          <a
            href={`https://wa.me/96898414500?text=${encodeURIComponent(t("whatsappGreeting"))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border-green-500/20 text-green-500"
          >
            <MessageCircle className="w-4 h-4" fill="currentColor" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{t("customerSupport")}</span>
          </a>
        )}
        <div className="flex-1" />
        <button onClick={toggleLanguage} className="text-right">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
            {language === "en" ? "English 🇬🇧" : "हिंदी 🇮🇳"}
          </p>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 flex flex-col"
          >
            <h1 className="text-3xl font-bold mb-2">{t("loginTitle")}</h1>
            <p className="text-muted-foreground mb-8">Login to continue your winning streak.</p>

            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <Label htmlFor="id">{t("emailOrPhone")}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="id"
                    placeholder={t("emailOrPhone")}
                    className="pl-10 h-12 rounded-xl glass"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("password")}</Label>
                  <Button variant="link" className="text-xs h-auto p-0 text-primary">
                    {t("forgotPassword")}
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 rounded-xl glass"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <Button
  onClick={handleLoginAPI}
                className="w-full h-12 rounded-xl text-lg font-bold mt-4 shadow-lg shadow-primary/20"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : t("login")}
              </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">{t("continueWith")}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-12 rounded-xl glass bg-transparent flex items-center gap-2"
                  onClick={() => handleOAuthLogin("google")}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-xl glass bg-transparent flex items-center gap-2"
                  onClick={() => handleOAuthLogin("microsoft")}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#f25022" d="M1 1h10v10H1z" />
                    <path fill="#00a4ef" d="M13 1h10v10H13z" />
                    <path fill="#7fba00" d="M1 13h10v10H1z" />
                    <path fill="#ffb900" d="M13 13h10v10H13z" />
                  </svg>
                  Microsoft
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Don't have an account?{" "}
              <button onClick={() => setMode("signup")} className="text-primary font-bold">
                {t("signup")}
              </button>
            </p>
          </motion.div>
        )}

        {mode === "signup" && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h1 className="text-3xl font-bold mb-2">{t("signupTitle")}</h1>
            <p className="text-muted-foreground mb-6">Join the community of 1M+ winners.</p>

            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              <div className="space-y-2">
                <Label htmlFor="name">{t("fullName")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-10 h-12 rounded-xl glass"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("emailOrPhone")}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+91 00000 00000"
                    className="pl-10 h-12 rounded-xl glass"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10 h-12 rounded-xl glass"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">{t("password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 rounded-xl glass"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referral">{t("referralCode")}</Label>
                <Input id="referral" placeholder="Optional" className="h-12 rounded-xl glass" />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" className="rounded-sm border-primary" />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-none">
                  I agree to the <span className="text-primary underline">Terms & Conditions</span>
                </label>
              </div>

              <Button
  onClick={handleSignupAPI}
  className="w-full h-12 rounded-xl text-lg font-bold mt-4 shadow-lg shadow-primary/20"
  disabled={isLoading}
>
  {isLoading ? "Creating..." : t("signup")}
</Button>

            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="text-primary font-bold">
                {t("login")}
              </button>
            </p>
          </motion.div>
        )}

        {mode === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col text-center"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Phone className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t("verifyOTP")}</h1>
            <p className="text-muted-foreground mb-12">
              {t("otpSent")} <br />{" "}
              <span className="text-foreground font-medium">{formData.phone || "+91 98765 43210"}</span>
            </p>

            <div className="flex justify-center gap-4 mb-8">
  {[0, 1, 2, 3].map((i) => (
    <Input
      key={i}
      className="w-14 h-14 text-center text-2xl font-bold rounded-2xl glass border-primary/30"
      maxLength={1}
      value={otp[i] || ""}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "")
        const newOtp = otp.split("")
        newOtp[i] = value
        setOtp(newOtp.join(""))
      }}
    />
  ))}
</div>


            <div className="space-y-4">
              <Button
                onClick={handleVerifyOTP}
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : `${t("verifyOTP")} & ${t("confirm")}`}
              </Button>
              <p className="text-sm text-muted-foreground">
                Didn't receive code? <button className="text-primary font-bold">{t("resendOTP")} in 0:45</button>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
