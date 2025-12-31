"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SplashScreen } from "@/components/splash-screen"
import { Onboarding } from "@/components/onboarding"
import { AuthScreen } from "@/components/auth-screen"
import Dashboard from "@/app/dashboard/page"
import { useApp } from "@/contexts/app-context"

export default function Home() {
  const [step, setStep] = useState<"splash" | "onboarding" | "auth" | "app">("splash")
  const { isAuthenticated } = useApp()

  useEffect(() => {
    // Auto transition from splash
    if (step === "splash") {
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          setStep("app")
        } else {
          setStep("onboarding")
        }
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [step, isAuthenticated])

  return (
    <div className="relative h-[100dvh] w-full flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {step === "splash" && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50"
          >
            <SplashScreen />
          </motion.div>
        )}

        {step === "onboarding" && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-40"
          >
            <Onboarding onComplete={() => setStep("auth")} />
          </motion.div>
        )}

        {step === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 z-30"
          >
            <AuthScreen onComplete={() => setStep("app")} />
          </motion.div>
        )}

        {step === "app" && (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20">
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
