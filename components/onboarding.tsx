"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Zap, Wallet, Users } from "lucide-react"
import { useApp } from "@/contexts/app-context"

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useApp()

  const SLIDES = [
    {
      id: 1,
      title: t("onboarding1Title"),
      description: t("onboarding1Desc"),
      icon: <Zap className="w-16 h-16 text-primary" />,
      color: "bg-primary/10",
    },
    {
      id: 2,
      title: t("onboarding2Title"),
      description: t("onboarding2Desc"),
      icon: <Wallet className="w-16 h-16 text-secondary" />,
      color: "bg-secondary/10",
    },
    {
      id: 3,
      title: t("onboarding3Title"),
      description: t("onboarding3Desc"),
      icon: <Users className="w-16 h-16 text-primary" />,
      color: "bg-primary/10",
    },
  ]

  const next = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="h-full w-full flex flex-col p-6 bg-background">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="mb-12"
          >
            <div
              className={`w-32 h-32 rounded-3xl ${SLIDES[currentSlide].color} flex items-center justify-center mb-8 mx-auto relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              {SLIDES[currentSlide].icon}
            </div>
            <h2 className="text-2xl font-bold mb-4">{SLIDES[currentSlide].title}</h2>
            <p className="text-muted-foreground leading-relaxed px-4">{SLIDES[currentSlide].description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mb-8">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"}`}
            />
          ))}
        </div>
      </div>

      <Button
        onClick={next}
        size="lg"
        className="w-full h-14 text-lg font-bold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95"
      >
        {currentSlide === SLIDES.length - 1 ? t("getStarted") : t("next")}
        <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  )
}
