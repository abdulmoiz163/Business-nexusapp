import express from "express"
import { sendRequest, getMyRequests, updateRequestStatus } from "../controllers/request.controller.js"
import { protect, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

// Protect all routes
router.use(protect)

router.route("/").post(authorize("investor"), sendRequest).get(getMyRequests)

router.route("/:id").patch(authorize("entrepreneur"), updateRequestStatus)

export default router
