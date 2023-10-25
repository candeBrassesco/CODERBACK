import { Router } from "express";
import { viewCartControler } from "../controllers/carts.controller.js";


const router = Router()

router.get('/:cid', viewCartControler)

export default router