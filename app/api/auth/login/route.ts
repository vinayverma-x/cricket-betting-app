import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json()

    if (!identifier || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      userId: user._id,
      phone: user.phone,
      email: user.email,
      name: user.name,
    })
  } catch (err) {
    return NextResponse.json({ message: "Login failed" }, { status: 500 })
  }
}
