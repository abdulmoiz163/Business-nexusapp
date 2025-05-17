import express from "express"
import {
  createEntrepreneurProfile,
  createInvestorProfile,
  getMyProfile,
  getProfileByUserId,
  getAllEntrepreneurs,
  getAllInvestors,
} from "../controllers/profile.controller.js"
import { protect, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

// Protect all routes
router.use(protect)

router.route("/me").get(getMyProfile)
router.route("/user/:userId").get(getProfileByUserId)

router.route("/entrepreneur").post(authorize("entrepreneur"), createEntrepreneurProfile)

router.route("/investor").post(authorize("investor"), createInvestorProfile)

router.route("/entrepreneurs").get(authorize("investor"), getAllEntrepreneurs)

router.route("/investors").get(authorize("entrepreneur"), getAllInvestors)

export default router
