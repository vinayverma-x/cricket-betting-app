// import { NextResponse } from "next/server"
// import { connectDB } from "@/lib/db"
// import User from "@/models/User"

// export async function POST(req: Request) {
//   try {
//     await connectDB()

//     const { amount, method } = await req.json()

//     if (!amount || amount <= 0) {
//       return NextResponse.json({ message: "Invalid amount" }, { status: 400 })
//     }

//     // TEMP: Replace with real auth later
//     const user = await User.findOne()

//     if (!user || user.walletBalance < amount) {
//       return NextResponse.json({ message: "Insufficient balance" }, { status: 400 })
//     }

//     user.walletBalance -= amount
//     await user.save()

//     return NextResponse.json({
//       success: true,
//       debitedFrom: "drnoelkmathew@okicici",
//       user,
//     })
//   } catch (error) {
//     return NextResponse.json({ message: "Withdrawal failed" }, { status: 500 })
//   }
// }



import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import Transaction from "@/models/Transaction"

export async function POST(req: Request) {
  try {
    await connectDB()

    const { userId, amount } = await req.json()

    if (!userId || !amount || amount <= 0) {
      return NextResponse.json(
        { message: "Invalid withdraw amount" },
        { status: 400 }
      )
    }

    await Transaction.create({
  userId,
  type: "withdraw",
  amount,
  method: "Bank / UPI",
  status: "pending",
})


    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    if (user.kyc?.status !== "verified") {
      return NextResponse.json(
        { message: "KYC not verified" },
        { status: 403 }
      )
    }

    if (user.walletBalance < amount) {
      return NextResponse.json(
        { message: "Insufficient balance" },
        { status: 400 }
      )
    }

    user.walletBalance -= amount
    await user.save()

    return NextResponse.json({
      message: "Withdrawal request submitted",
      walletBalance: user.walletBalance,
    })
  } catch {
    return NextResponse.json(
      { message: "Withdraw failed" },
      { status: 500 }
    )
  }
}
