import Request from "../models/request.model.js"
import User from "../models/user.model.js"

// @desc    Send collaboration request
// @route   POST /api/requests
// @access  Private (Investor only)
export const sendRequest = async (req, res) => {
  try {
    const { entrepreneurId, message } = req.body

    // Check if entrepreneur exists
    const entrepreneur = await User.findById(entrepreneurId)

    if (!entrepreneur || entrepreneur.role !== "entrepreneur") {
      return res.status(404).json({
        success: false,
        message: "Entrepreneur not found",
      })
    }

    // Check if request already exists
    const existingRequest = await Request.findOne({
      investor: req.user.id,
      entrepreneur: entrepreneurId,
    })

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Request already sent to this entrepreneur",
      })
    }

    // Create new request
    const request = await Request.create({
      investor: req.user.id,
      entrepreneur: entrepreneurId,
      message,
    })

    res.status(201).json({
      success: true,
      request,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Get all requests for current user
// @route   GET /api/requests
// @access  Private
export const getMyRequests = async (req, res) => {
  try {
    let requests

    if (req.user.role === "entrepreneur") {
      // Get requests received by entrepreneur
      requests = await Request.find({ entrepreneur: req.user.id }).populate("investor", "name email").sort("-createdAt")
    } else {
      // Get requests sent by investor
      requests = await Request.find({ investor: req.user.id }).populate("entrepreneur", "name email").sort("-createdAt")
    }

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Update request status
// @route   PATCH /api/requests/:id
// @access  Private (Entrepreneur only)
export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Status must be either accepted or rejected",
      })
    }

    // Find request
    let request = await Request.findById(req.params.id)

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      })
    }

    // Check if user is the entrepreneur who received the request
    if (request.entrepreneur.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this request",
      })
    }

    // Update request status
    request = await Request.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate(
      "investor",
      "name email",
    )

    res.status(200).json({
      success: true,
      request,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
