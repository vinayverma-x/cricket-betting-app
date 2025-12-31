"use client"

import { motion } from "framer-motion"
import { Trophy } from "lucide-react"

export function SplashScreen() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-24 h-24 bg-primary/20 rounded-full absolute -inset-4 blur-2xl animate-pulse" />
        <Trophy className="w-24 h-24 text-primary relative z-10" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8 text-center px-6"
      >
        <h1 className="text-3xl font-bold tracking-tighter mb-2">
          CRIC<span className="text-primary">BET</span>
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">Fast • Secure • Real-Time</p>
      </motion.div>
    </div>
  )
}
