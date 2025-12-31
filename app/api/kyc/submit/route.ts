// import { NextResponse } from "next/server"
// import { connectDB } from "@/lib/mongodb"
// import User from "@/models/User"

// export async function POST(req: Request) {
//    try {
//     await connectDB()

//   const { userId, pan, aadhaar, bankAccount, ifsc } = await req.json()

//   if (!pan || !aadhaar || !bankAccount || !ifsc) {
//     return NextResponse.json({ message: "All fields required" }, { status: 400 })
//   }

//   await User.findByIdAndUpdate(userId, {
//     kyc: {
//       pan,
//       aadhaar,
//       bankAccount,
//       ifsc,
//       verified: false,
//       status: "pending",
//       submittedAt: new Date(),
//     },
//   })

//   return NextResponse.json({
//     message: "KYC submitted successfully. Verification pending.",
//   })
// } catch (err) {
//     return NextResponse.json(
//       { message: "KYC submission failed" },
//       { status: 500 }
//     )
//   }
// }


import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req: Request) {
  try {
    await connectDB()

    const { userId, pan, aadhaar, bankAccount, ifsc } = await req.json()

    if (!userId || !pan || !aadhaar || !bankAccount || !ifsc) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      )
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        pan,
        aadhaar,
        bankAccount,
        ifsc,
        kycStatus: "pending",
      },
      { new: true }
    )

    return NextResponse.json({
      message: "KYC submitted successfully",
      kycStatus: user.kycStatus,
    })
  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}
