import { Router } from "express";
import { userAuth } from "../middlewares/role.middleware.js";
import { getMessagesController } from "../controllers/messages.controller.js";

const router = Router()

router.get("/", userAuth, getMessagesController)

export default router