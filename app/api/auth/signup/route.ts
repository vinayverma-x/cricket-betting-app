import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json()

    if (!password || (!email && !phone)) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 })
    }

    await connectDB()

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { message: "Signup failed" },
      { status: 500 }
    )
  }
}
