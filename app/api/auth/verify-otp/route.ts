import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req: Request) {
  try {
    const { userId, otp } = await req.json()

    await connectDB()

    const user = await User.findById(userId)

    if (!user || !user.otp) {
      return NextResponse.json({ message: "OTP not found" }, { status: 400 })
    }

    if (user.otp.code !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 401 })
    }

    if (user.otp.expiresAt < new Date()) {
      return NextResponse.json({ message: "OTP expired" }, { status: 410 })
    }

    user.isVerified = true
    user.otp = undefined
    await user.save()

    // return NextResponse.json({
    //   success: true,
    //   user: {
    //     name: user.name,
    //     email: user.email,
    //     phone: user.phone,
    //     walletBalance: user.walletBalance,
    //     kyc: user.kyc,
    //   },
    // })
    return NextResponse.json({
  user: {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    walletBalance: user.walletBalance,
    kyc: {
  status: user.kyc?.status || "none",
},
  },
})

  } catch (err) {
    return NextResponse.json({ message: "OTP verification failed" }, { status: 500 })
  }
}
