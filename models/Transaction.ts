import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["deposit", "withdraw", "bet"] },
    amount: Number,
    method: String,
    status: { type: String, default: "completed" },
  },
  { timestamps: true }
)

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema)
