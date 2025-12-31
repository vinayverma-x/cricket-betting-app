import mongoose, { Schema, models } from "mongoose"

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    password: String,

    provider: { type: String, default: "credentials" }, // google, microsoft
    isVerified: { type: Boolean, default: false },
    otp: {
  code: String,
  expiresAt: Date,
},


    walletBalance: { type: Number, default: 0 },

    kyc: {
      pan: String,
      aadhaar: String,
      bankAccount: String,
      ifsc: String,
      status: {
    type: String,
    enum: ["none", "pending", "verified", "rejected"],
    default: "none",
  },
  submittedAt: Date,
      verified: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
)

export default models.User || mongoose.model("User", UserSchema)
