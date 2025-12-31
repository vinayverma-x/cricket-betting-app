"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApp, type Currency } from "@/contexts/app-context"
import { useTheme } from "next-themes"
import { Lock, Globe, Coins, Moon, Sun, Monitor, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function SettingsScreen() {
  const { language, setLanguage, currency, setCurrency, t } = useApp()
  const { theme, setTheme } = useTheme()
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t("settings")}</h2>
        <p className="text-sm text-muted-foreground">Manage your app preferences</p>
      </div>

      <div className="space-y-3">
        <SettingItem icon={Lock} label={t("changePassword")} value="••••••••" onClick={() => setPasswordOpen(true)} />
        <SettingItem
          icon={Globe}
          label={t("language")}
          value={language === "en" ? "English" : "हिंदी"}
          onClick={() => setLanguageOpen(true)}
        />
        <SettingItem icon={Coins} label={t("currency")} value={currency} onClick={() => setCurrencyOpen(true)} />
        <SettingItem
          icon={theme === "dark" ? Moon : Sun}
          label={t("theme")}
          value={theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System"}
          onClick={() => setThemeOpen(true)}
        />
      </div>

      <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
        <DialogContent className="rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{t("changePassword")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" className="h-12 rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" className="h-12 rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" className="h-12 rounded-2xl" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-bold">{t("confirm")}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={languageOpen} onOpenChange={setLanguageOpen}>
        <DialogContent className="rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{t("language")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <RadioGroup
              value={language}
              onValueChange={(value) => {
                setLanguage(value as "en" | "hi")
                setLanguageOpen(false)
              }}
            >
              <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                <RadioGroupItem value="en" id="lang-en" />
                <Label htmlFor="lang-en" className="flex items-center gap-2 cursor-pointer flex-1">
                  <span className="font-bold">English</span>
                  <span className="text-2xl">🇬🇧</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                <RadioGroupItem value="hi" id="lang-hi" />
                <Label htmlFor="lang-hi" className="flex items-center gap-2 cursor-pointer flex-1">
                  <span className="font-bold">हिंदी</span>
                  <span className="text-2xl">🇮🇳</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={currencyOpen} onOpenChange={setCurrencyOpen}>
        <DialogContent className="rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{t("currency")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <RadioGroup
              value={currency}
              onValueChange={(value) => {
                setCurrency(value as Currency)
                setCurrencyOpen(false)
              }}
            >
              {(["INR", "USD", "EUR", "GBP", "AUD"] as Currency[]).map((curr) => (
                <div key={curr} className="flex items-center space-x-3 glass p-4 rounded-2xl">
                  <RadioGroupItem value={curr} id={`curr-${curr}`} />
                  <Label htmlFor={`curr-${curr}`} className="flex items-center gap-2 cursor-pointer flex-1">
                    <span className="font-bold">{curr}</span>
                    <span className="text-muted-foreground text-sm">
                      {curr === "INR" && "Indian Rupee"}
                      {curr === "USD" && "US Dollar"}
                      {curr === "EUR" && "Euro"}
                      {curr === "GBP" && "British Pound"}
                      {curr === "AUD" && "Australian Dollar"}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={themeOpen} onOpenChange={setThemeOpen}>
        <DialogContent className="rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{t("theme")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <RadioGroup
              value={theme}
              onValueChange={(value) => {
                setTheme(value)
                setThemeOpen(false)
              }}
            >
              <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Sun className="w-5 h-5 text-primary" />
                  <span className="font-bold">Light</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Moon className="w-5 h-5 text-primary" />
                  <span className="font-bold">Dark</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 glass p-4 rounded-2xl">
                <RadioGroupItem value="system" id="theme-system" />
                <Label htmlFor="theme-system" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Monitor className="w-5 h-5 text-primary" />
                  <span className="font-bold">System</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SettingItem({
  icon: Icon,
  label,
  value,
  onClick,
}: {
  icon: any
  label: string
  value?: string
  onClick?: () => void
}) {
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
      <div className="flex items-center gap-2">
        {value && <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{value}</span>}
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </button>
  )
}
