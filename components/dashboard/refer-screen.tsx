"use client"

import { Button } from "@/components/ui/button"
import { Share2, Copy, Trophy, Gift } from "lucide-react"

export function ReferScreen() {
  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
          <Gift className="w-12 h-12 text-primary" />
          <div className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-background">
            <Trophy className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Refer & Earn ₹500</h2>
        <p className="text-muted-foreground text-sm px-8">
          Share the winning experience with friends and earn rewards for every signup.
        </p>
      </div>

      <div className="glass p-6 rounded-[2rem] space-y-4 border-primary/20">
        <p className="text-xs text-center font-bold text-muted-foreground uppercase tracking-widest">
          Your Referral Code
        </p>
        <div className="flex gap-2">
          <div className="flex-1 bg-background rounded-2xl border border-dashed border-primary/50 flex items-center justify-center font-mono font-black text-xl tracking-widest py-4 text-primary">
            WINNER500
          </div>
          <Button variant="outline" size="icon" className="w-14 h-auto rounded-2xl glass bg-transparent">
            <Copy className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-3xl text-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Total Referrals</p>
          <p className="text-2xl font-black">24</p>
        </div>
        <div className="glass p-4 rounded-3xl text-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Earned Rewards</p>
          <p className="text-2xl font-black text-primary">₹12,000</p>
        </div>
      </div>

      <Button className="w-full h-14 rounded-2xl gap-2 text-lg font-bold shadow-xl shadow-primary/20 bg-green-500 hover:bg-green-600">
        <Share2 className="w-5 h-5" /> Share via WhatsApp
      </Button>

      <section className="pt-4">
        <h4 className="font-bold mb-4">How it works?</h4>
        <div className="space-y-4">
          {[
            { step: 1, text: "Share your code with friends" },
            { step: 2, text: "They register & complete KYC" },
            { step: 3, text: "You both get rewarded instantly" },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                {item.step}
              </div>
              <p className="text-sm font-medium text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
