import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ message: "User ID required" }, { status: 400 })
    }

    await connectDB()

    const otp = Math.floor(1000 + Math.random() * 9000).toString()

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

    await User.findByIdAndUpdate(userId, {
      otp: { code: otp, expiresAt },
    })

    // ⚠️ SMS integration goes here (Twilio / Fast2SMS)
    console.log("OTP sent:", otp)

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ message: "OTP send failed" }, { status: 500 })
  }
}
