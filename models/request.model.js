import mongoose from "mongoose"

const requestSchema = new mongoose.Schema(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    entrepreneur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

// Ensure an investor can only send one request to an entrepreneur
requestSchema.index({ investor: 1, entrepreneur: 1 }, { unique: true })

const Request = mongoose.model("Request", requestSchema)

export default Request
