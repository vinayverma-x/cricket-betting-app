import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Transaction from "@/models/Transaction"

export async function POST(req: Request) {
  try {
    await connectDB()
    const { userId } = await req.json()

    const txs = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50)

    return NextResponse.json(txs)
  } catch (err) {
    return NextResponse.json({ message: "Failed to load transactions" }, { status: 500 })
  }
}
