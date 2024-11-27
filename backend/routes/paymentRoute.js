import express from "express"
import { createCheckOut } from "../controllers/PaymenControler.js";
import { isAuthenticatedUser } from "../middleware/authUser.js";
const router = express.Router()


router.route('/create-checkout-sessions').post(isAuthenticatedUser, createCheckOut)

export default router;