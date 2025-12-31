"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useApp } from "@/contexts/app-context"

export function WhatsAppSupport() {
  const { t } = useApp()
  const whatsappNumber = "96898414500" // +968 9841 4500
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t("whatsappGreeting"))}`

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-28 right-4 z-40 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative">
        {/* Pulsing background effect */}
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full opacity-20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        
        {/* Main button */}
        <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border-2 border-green-400/20">
          <MessageCircle className="w-7 h-7 text-white" fill="white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          <div className="glass px-3 py-2 rounded-lg border border-green-500/20 backdrop-blur-xl">
            <p className="text-xs font-bold text-green-500">{t("customerSupport")}</p>
            <p className="text-[10px] text-muted-foreground">+968 9841 4500</p>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
