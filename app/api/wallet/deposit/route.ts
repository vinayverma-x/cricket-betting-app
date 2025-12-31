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
//     const userId = (await User.findOne())._id

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { $inc: { walletBalance: amount } },
//       { new: true }
//     )

//     return NextResponse.json({
//       success: true,
//       creditedTo: "drnoelkmathew@okicici",
//       user,
//     })
//   } catch (error) {
//     return NextResponse.json({ message: "Deposit failed" }, { status: 500 })
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
        { message: "Invalid deposit amount" },
        { status: 400 }
      )
    }


  await Transaction.create({
  userId,
  type: "deposit",
  amount,
  method: "UPI",
  status: "completed",
})

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    user.walletBalance += amount
    await user.save()

    return NextResponse.json({
      message: "Deposit successful",
      walletBalance: user.walletBalance,
    })



  } catch {
    return NextResponse.json(
      { message: "Deposit failed" },
      { status: 500 }
    )
  }
}
