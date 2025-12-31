"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApp } from "@/contexts/app-context"
import { CheckCircle2, AlertCircle, Upload, FileText, Award as IdCard, User } from "lucide-react"
import { motion } from "framer-motion"

export function KYCScreen() {
  const { user, setUser, t } = useApp()
  const [uploading, setUploading] = useState(false)
  const [documents, setDocuments] = useState({
    aadhaar: false,
    pan: false,
    selfie: false,
  })

const [pan, setPan] = useState("")
const [aadhaar, setAadhaar] = useState("")
const [bankAccount, setBankAccount] = useState("")
const [ifsc, setIfsc] = useState("")
const [loading, setLoading] = useState(false)

  const handleUpload = (docType: keyof typeof documents) => {
    setUploading(true)
    setTimeout(() => {
      setDocuments({ ...documents, [docType]: true })
      setUploading(false)
    }, 1500)
  }


//   const handleSubmitKYC = async () => {
//   if (!user) return

//   setLoading(true)

//   const res = await fetch("/api/kyc/submit", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       userId: user._id,
//       pan,
//       aadhaar,
//       bankAccount,
//       ifsc,
//     }),
//   })

//   const data = await res.json()
//   alert(data.message)
//   setLoading(false)
// }




const handleSubmitKYC = async () => {
  if (!user) return

  setLoading(true)

  const res = await fetch("/api/kyc/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user._id,
      pan,
      aadhaar,
      bankAccount,
      ifsc,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    alert(data.message)
    setLoading(false)
    return
  }

  // // 🔥 AUTO-REFRESH USER STATE
  // setUser((prev) =>
  //   prev ? { ...prev, kycStatus: data.kycStatus } : prev
  // )

  alert("KYC submitted. Verification pending.")
  setLoading(false)
}




//   const getStatusBadge = () => {
//   if (!user) return null

//   const statusConfig: any = {
//     verified: {
//       icon: CheckCircle2,
//       text: t("verified"),
//       bg: "bg-green-500/10",
//       text_color: "text-green-500",
//       border: "border-green-500/30",
//     },
//     pending: {
//       icon: AlertCircle,
//       text: t("pending"),
//       bg: "bg-amber-500/10",
//       text_color: "text-amber-500",
//       border: "border-amber-500/30",
//     },
//     not_started: {
//       icon: AlertCircle,
//       text: t("notSubmitted"),
//       bg: "bg-gray-500/10",
//       text_color: "text-gray-500",
//       border: "border-gray-500/30",
//     },
//   }

//   const config = statusConfig[user.kycStatus || "not_started"]
//   const Icon = config.icon

//   return (
//     <div className={`${config.bg} ${config.border} border px-4 py-2 rounded-full flex items-center gap-2`}>
//       <Icon className={`w-4 h-4 ${config.text_color}`} />
//       <span className={`font-bold text-sm ${config.text_color}`}>
//         {config.text}
//       </span>
//     </div>
//   )
// }

const getStatusBadge = () => {
  if (!user) return null

  const statusConfig: Record<string, any> = {
    verified: {
      icon: CheckCircle2,
      text: t("verified"),
      bg: "bg-green-500/10",
      text_color: "text-green-500",
      border: "border-green-500/30",
    },
    pending: {
      icon: AlertCircle,
      text: t("pending"),
      bg: "bg-amber-500/10",
      text_color: "text-amber-500",
      border: "border-amber-500/30",
    },
    not_started: {
      icon: AlertCircle,
      text: t("notSubmitted"),
      bg: "bg-gray-500/10",
      text_color: "text-gray-500",
      border: "border-gray-500/30",
    },
    submitted: {
      icon: AlertCircle,
      text: t("pending"),
      bg: "bg-amber-500/10",
      text_color: "text-amber-500",
      border: "border-amber-500/30",
    },
    rejected: {
      icon: AlertCircle,
      text: "Rejected",
      bg: "bg-red-500/10",
      text_color: "text-red-500",
      border: "border-red-500/30",
    },
  }

  const statusKey = user.kycStatus ?? "not_started"
  const config = statusConfig[statusKey] ?? statusConfig["not_started"]
  const Icon = config.icon

  return (
    <div className={`${config.bg} ${config.border} border px-4 py-2 rounded-full flex items-center gap-2`}>
      <Icon className={`w-4 h-4 ${config.text_color}`} />
      <span className={`font-bold text-sm ${config.text_color}`}>
        {config.text}
      </span>
    </div>
  )
}



  if (user?.kycStatus === "verified") {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">{t("verified")}</h2>
        <p className="text-muted-foreground text-center mb-8">
          Your KYC has been successfully verified. You can now enjoy full access to all features.
        </p>
        {getStatusBadge()}
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t("kycVerification")}</h2>
          <p className="text-sm text-muted-foreground">Complete your verification</p>
        </div>
        {getStatusBadge()}
      </div>

      <div className="glass p-4 rounded-2xl border-primary/20 bg-primary/5">
        <h3 className="font-bold text-sm mb-2 text-primary">Why KYC?</h3>
        <p className="text-xs text-muted-foreground">
          KYC verification is required to ensure security and comply with regulations. It helps protect your account and
          enables faster withdrawals.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold">{t("uploadDocuments")}</h3>

        <DocumentUpload
          icon={IdCard}
          title="Aadhaar Card"
          description="Upload front side of your Aadhaar"
          uploaded={documents.aadhaar}
          onUpload={() => handleUpload("aadhaar")}
          uploading={uploading}
        />

        <DocumentUpload
          icon={FileText}
          title="PAN Card"
          description="Upload your PAN card"
          uploaded={documents.pan}
          onUpload={() => handleUpload("pan")}
          uploading={uploading}
        />

        <DocumentUpload
          icon={User}
          title="Selfie"
          description="Upload a clear selfie"
          uploaded={documents.selfie}
          onUpload={() => handleUpload("selfie")}
          uploading={uploading}
        />
      </div>


      <div className="space-y-4">
  <Input
    placeholder="PAN Number"
    onChange={(e) => setPan(e.target.value)}
  />

  <Input
    placeholder="Aadhaar Number"
    onChange={(e) => setAadhaar(e.target.value)}
  />

  <Input
    placeholder="Bank Account Number"
    onChange={(e) => setBankAccount(e.target.value)}
  />

  <Input
    placeholder="IFSC Code"
    onChange={(e) => setIfsc(e.target.value)}
  />
</div>



      <Button
  onClick={handleSubmitKYC}
  disabled={
    !documents.aadhaar ||
    !documents.pan ||
    !documents.selfie ||
    loading
  }
  className="w-full h-14 rounded-2xl text-lg font-bold"
  size="lg"
>
  {loading ? "Submitting..." : `${t("submit")} KYC`}
</Button>

    </div>
  )
}

function DocumentUpload({
  icon: Icon,
  title,
  description,
  uploaded,
  onUpload,
  uploading,
}: {
  icon: any
  title: string
  description: string
  uploaded: boolean
  onUpload: () => void
  uploading: boolean
}) {
  return (
    <div className={`glass p-4 rounded-2xl border ${uploaded ? "border-green-500/30 bg-green-500/5" : ""}`}>
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            uploaded ? "bg-green-500/10 text-green-500" : "bg-primary/10 text-primary"
          }`}
        >
          {uploaded ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {!uploaded && (
          <Button
            size="sm"
            variant="outline"
            className="rounded-xl bg-transparent"
            onClick={onUpload}
            disabled={uploading}
          >
            <Upload className="w-4 h-4 mr-1" />
            {uploading ? "..." : "Upload"}
          </Button>
        )}
      </div>
    </div>
  )
}
