import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req: Request) {
  await connectDB()
  const { userId } = await req.json()

  await User.findByIdAndUpdate(userId, {
    "kyc.status": "verified",
  })

  return NextResponse.json({ message: "KYC approved" })
}
