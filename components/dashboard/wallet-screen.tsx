"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, History, CreditCard, Landmark, Bitcoin, Smartphone } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function WalletScreen() {
  const { formatCurrency, user, setUser, t } = useApp()
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [transactions, setTransactions] = useState<any[]>([])



useEffect(() => {
  if (!user?._id) return

  fetch("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user._id }),
  })
    .then((res) => res.json())
    .then(setTransactions)
}, [user?._id])


const handleDeposit = async () => {
  try {
    if (!amount) return alert("Enter amount")

    setLoading(true)

    const res = await fetch("/api/wallet/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?._id,
        amount: Number(amount),
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message)
      return
    }

    setUser((prev) =>
      prev ? { ...prev, walletBalance: data.balance } : prev
    )

    alert("Deposit successful")
    setAmount("")
  } finally {
    setLoading(false)
  }
}



const handleWithdraw = async () => {
  try {
    if (!amount) return alert("Enter amount")

    setLoading(true)

    const res = await fetch("/api/wallet/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?._id,
        amount: Number(amount),
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message)
      return
    }

    setUser((prev) =>
      prev ? { ...prev, walletBalance: data.balance } : prev
    )

    setWithdrawOpen(false)
    alert("Withdrawal successful")
    setAmount("")
  } finally {
    setLoading(false)
  }
}






  return (
    <div className="p-4 space-y-6">
      <div className="bg-primary p-6 rounded-[2rem] text-primary-foreground shadow-2xl shadow-primary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <CreditCard className="w-24 h-24 rotate-12" />
        </div>
        <p className="text-xs uppercase tracking-widest font-bold opacity-80 mb-1">{t("totalBalance")}</p>
        <h2 className="text-4xl font-black mb-6">{formatCurrency(user?.walletBalance || 0)}</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
            <p className="text-[10px] uppercase font-bold opacity-70">{t("winnings")}</p>
            <p className="text-lg font-bold">{formatCurrency((user?.walletBalance || 0) * 0.6)}</p>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
            <p className="text-[10px] uppercase font-bold opacity-70">{t("bonusBalance")}</p>
            <p className="text-lg font-bold">{formatCurrency((user?.walletBalance || 0) * 0.4)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button className="h-14 rounded-2xl gap-2 font-bold shadow-lg" size="lg" onClick={() => setDepositOpen(true)}>
          <ArrowUpRight className="w-5 h-5" /> {t("deposit")}
        </Button>
        <Button
          variant="outline"
          disabled={user?.kycStatus !== "verified"}
          className="h-14 rounded-2xl gap-2 font-bold glass bg-transparent"
          size="lg"
          onClick={() => setWithdrawOpen(true)}
        >
          <ArrowDownLeft className="w-5 h-5" /> {t("withdraw")}
        </Button>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2">
            <History className="w-4 h-4 text-primary" /> {t("transactions")}
          </h3>
          <Button variant="link" className="text-primary text-xs h-auto p-0">
            See All
          </Button>
        </div>
        {/* <div className="space-y-3">
          <TransactionItem type="deposit" amount="+5000" method="UPI" date="22 Oct, 14:20" status="success" />
          <TransactionItem type="bet" amount="-1200" method="Match Bet" date="21 Oct, 18:45" status="pending" />
          <TransactionItem type="withdraw" amount="-2500" method="Bank" date="20 Oct, 10:15" status="completed" />
        </div> */}

        <div className="space-y-3">
  {transactions.length === 0 && (
    <p className="text-xs text-muted-foreground text-center">
      No transactions yet
    </p>
  )}

  {transactions.map((tx) => (
    <TransactionItem
      key={tx._id}
      type={tx.type}
      amount={`${tx.type === "deposit" ? "+" : "-"}${tx.amount}`}
      method={tx.method}
      date={new Date(tx.createdAt).toLocaleString()}
      status={tx.status}
    />
  ))}
</div>

      </section>

      <section className="glass p-4 rounded-3xl border-primary/20 bg-primary/5">
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Deposit Methods</p>
        <div className="flex justify-between items-center opacity-70">
          <Landmark className="w-6 h-6" />
          <CreditCard className="w-6 h-6" />
          <Bitcoin className="w-6 h-6" />
          <Smartphone className="w-6 h-6" />
          <span className="font-bold text-xs">+3 More</span>
        </div>
      </section>

      <Dialog open={depositOpen} onOpenChange={setDepositOpen}>
        <DialogContent className="rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{t("deposit")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Amount</Label>
              <Input
                id="deposit-amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-14 text-lg rounded-2xl"
              />
            </div>

            <div className="flex gap-2">
              {[500, 1000, 2500, 5000].map((val) => (
                <Button
                  key={val}
                  variant="outline"
                  size="sm"
                  className="rounded-xl bg-transparent"
                  onClick={() => setAmount(val.toString())}
                >
                  {formatCurrency(val)}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <span className="font-bold">UPI</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Landmark className="w-5 h-5 text-primary" />
                    <span className="font-bold">Bank Transfer</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span className="font-bold">Credit/Debit Card</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label htmlFor="crypto" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Bitcoin className="w-5 h-5 text-primary" />
                    <span className="font-bold">Cryptocurrency</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={handleDeposit} 
            disabled={loading}
            className="w-full h-14 rounded-2xl text-lg font-bold" size="lg">
              {t("confirm")} {t("deposit")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
        <DialogContent className="rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{t("withdraw")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="glass p-4 rounded-2xl border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(user?.walletBalance || 0)}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Withdrawal Amount</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-14 text-lg rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Withdrawal Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                  <RadioGroupItem value="upi" id="withdraw-upi" />
                  <Label htmlFor="withdraw-upi" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <span className="font-bold">UPI</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                  <RadioGroupItem value="bank" id="withdraw-bank" />
                  <Label htmlFor="withdraw-bank" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Landmark className="w-5 h-5 text-primary" />
                    <span className="font-bold">Bank Transfer</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                  <RadioGroupItem value="crypto" id="withdraw-crypto" />
                  <Label htmlFor="withdraw-crypto" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Bitcoin className="w-5 h-5 text-primary" />
                    <span className="font-bold">Cryptocurrency</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="glass p-3 rounded-2xl border-amber-500/30 bg-amber-500/5">
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Withdrawals are processed within 24-48 hours. Min withdrawal: {formatCurrency(100)}
              </p>
            </div>

            {user?.kycStatus !== "verified" && (
  <p className="text-xs text-red-500 font-bold">
    Complete KYC to enable withdrawals
  </p>
)}


            <Button onClick={handleWithdraw} 
            disabled={loading || user?.kycStatus !== "verified"}
            className="w-full h-14 rounded-2xl text-lg font-bold" size="lg">
              {t("confirm")} {t("withdraw")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function TransactionItem({
  type,
  amount,
  method,
  date,
  status,
}: {
  type: string
  amount: string
  method: string
  date: string
  status: string
}) {
  const { formatCurrency, t } = useApp()
  const numAmount = Number.parseFloat(amount)
  const displayAmount = `${numAmount > 0 ? "+" : ""}${formatCurrency(Math.abs(numAmount))}`

  return (
    <div className="glass p-4 rounded-2xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            type === "deposit"
              ? "bg-green-500/10 text-green-500"
              : type === "withdraw"
                ? "bg-orange-500/10 text-orange-500"
                : "bg-primary/10 text-primary"
          }`}
        >
          {type === "deposit" ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
        </div>
        <div>
          <p className="font-bold text-sm">{method}</p>
          <p className="text-[10px] text-muted-foreground">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-black text-sm ${numAmount > 0 ? "text-green-500" : ""}`}>{displayAmount}</p>
        <p
          className={`text-[10px] font-bold ${
            status === "success" || status === "completed" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {t(status)}
        </p>
      </div>
    </div>
  )
}
