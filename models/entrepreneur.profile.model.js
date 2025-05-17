import mongoose from "mongoose"

const entrepreneurProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startup: {
      name: {
        type: String,
        required: [true, "Please provide your startup name"],
      },
      description: {
        type: String,
        required: [true, "Please provide a description of your startup"],
      },
      foundedDate: {
        type: Date,
      },
      website: String,
      logo: String,
    },
    bio: {
      type: String,
      required: [true, "Please provide a bio"],
    },
    location: String,
    industry: {
      type: [String],
      required: [true, "Please specify your industry"],
    },
    pitchDeck: String,
    funding: {
      stage: {
        type: String,
        enum: ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Series D+", "Bootstrapped"],
      },
      raised: Number,
      seeking: Number,
      equity: Number,
    },
    team: [
      {
        name: String,
        role: String,
        linkedin: String,
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

const EntrepreneurProfile = mongoose.model("EntrepreneurProfile", entrepreneurProfileSchema)

export default EntrepreneurProfile
