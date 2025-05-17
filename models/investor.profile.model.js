import mongoose from "mongoose"

const investorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      name: String,
      website: String,
      logo: String,
    },
    bio: {
      type: String,
      required: [true, "Please provide a bio"],
    },
    location: String,
    investmentInterests: {
      type: [String],
      required: [true, "Please specify your investment interests"],
    },
    investmentStages: {
      type: [String],
      enum: ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Series D+"],
    },
    investmentRange: {
      min: Number,
      max: Number,
    },
    portfolio: [
      {
        companyName: String,
        industry: String,
        website: String,
      },
    ],
    socialLinks: {
      linkedin: String,
      twitter: String,
      facebook: String,
      instagram: String,
    },
  },
  {
    timestamps: true,
  },
)

const InvestorProfile = mongoose.model("InvestorProfile", investorProfileSchema)

export default InvestorProfile
