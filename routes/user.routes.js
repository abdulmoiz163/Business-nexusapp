import express from "express"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

// Protect all routes
router.use(protect)

// This is a placeholder for future user-related routes
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User routes are working",
  })
})

export default router
