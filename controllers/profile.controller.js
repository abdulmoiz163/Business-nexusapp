import User from "../models/user.model.js"
import EntrepreneurProfile from "../models/entrepreneur.profile.model.js"
import InvestorProfile from "../models/investor.profile.model.js"

// @desc    Create or update entrepreneur profile
// @route   POST /api/profiles/entrepreneur
// @access  Private (Entrepreneur only)
export const createEntrepreneurProfile = async (req, res) => {
  try {
    const { startup, bio, location, industry, funding, team, socialLinks } = req.body

    // Check if profile already exists
    let profile = await EntrepreneurProfile.findOne({ user: req.user.id })

    if (profile) {
      // Update existing profile
      profile = await EntrepreneurProfile.findOneAndUpdate({ user: req.user.id }, { $set: req.body }, { new: true })
    } else {
      // Create new profile
      profile = await EntrepreneurProfile.create({
        user: req.user.id,
        startup,
        bio,
        location,
        industry,
        funding,
        team,
        socialLinks,
      })

      // Update user to mark profile as completed
      await User.findByIdAndUpdate(req.user.id, { profileCompleted: true })
    }

    res.status(200).json({
      success: true,
      profile,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Create or update investor profile
// @route   POST /api/profiles/investor
// @access  Private (Investor only)
export const createInvestorProfile = async (req, res) => {
  try {
    const { company, bio, location, investmentInterests, investmentStages, investmentRange, portfolio, socialLinks } =
      req.body

    // Check if profile already exists
    let profile = await InvestorProfile.findOne({ user: req.user.id })

    if (profile) {
      // Update existing profile
      profile = await InvestorProfile.findOneAndUpdate({ user: req.user.id }, { $set: req.body }, { new: true })
    } else {
      // Create new profile
      profile = await InvestorProfile.create({
        user: req.user.id,
        company,
        bio,
        location,
        investmentInterests,
        investmentStages,
        investmentRange,
        portfolio,
        socialLinks,
      })

      // Update user to mark profile as completed
      await User.findByIdAndUpdate(req.user.id, { profileCompleted: true })
    }

    res.status(200).json({
      success: true,
      profile,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Get current user's profile
// @route   GET /api/profiles/me
// @access  Private
export const getMyProfile = async (req, res) => {
  try {
    let profile

    if (req.user.role === "entrepreneur") {
      profile = await EntrepreneurProfile.findOne({ user: req.user.id })
    } else {
      profile = await InvestorProfile.findOne({ user: req.user.id })
    }

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    res.status(200).json({
      success: true,
      profile,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Get profile by user ID
// @route   GET /api/profiles/user/:userId
// @access  Private
export const getProfileByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    let profile

    if (user.role === "entrepreneur") {
      profile = await EntrepreneurProfile.findOne({ user: req.params.userId })
    } else {
      profile = await InvestorProfile.findOne({ user: req.params.userId })
    }

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    res.status(200).json({
      success: true,
      profile,
      userRole: user.role,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Get all entrepreneurs
// @route   GET /api/profiles/entrepreneurs
// @access  Private (Investor only)
export const getAllEntrepreneurs = async (req, res) => {
  try {
    const users = await User.find({ role: "entrepreneur", profileCompleted: true })

    const entrepreneurProfiles = await EntrepreneurProfile.find({
      user: { $in: users.map((user) => user._id) },
    })

    const entrepreneurs = entrepreneurProfiles.map((profile) => {
      const user = users.find((u) => u._id.toString() === profile.user.toString())
      return {
        id: user._id,
        name: user.name,
        profile: {
          id: profile._id,
          startup: profile.startup,
          bio: profile.bio,
          location: profile.location,
          industry: profile.industry,
        },
      }
    })

    res.status(200).json({
      success: true,
      count: entrepreneurs.length,
      entrepreneurs,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Get all investors
// @route   GET /api/profiles/investors
// @access  Private (Entrepreneur only)
export const getAllInvestors = async (req, res) => {
  try {
    const users = await User.find({ role: "investor", profileCompleted: true })

    const investorProfiles = await InvestorProfile.find({
      user: { $in: users.map((user) => user._id) },
    })

    const investors = investorProfiles.map((profile) => {
      const user = users.find((u) => u._id.toString() === profile.user.toString())
      return {
        id: user._id,
        name: user.name,
        profile: {
          id: profile._id,
          company: profile.company,
          bio: profile.bio,
          location: profile.location,
          investmentInterests: profile.investmentInterests,
        },
      }
    })

    res.status(200).json({
      success: true,
      count: investors.length,
      investors,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
