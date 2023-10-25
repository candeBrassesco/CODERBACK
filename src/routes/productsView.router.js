import { Router } from "express";
import { viewProductsController } from "../controllers/products.controllers.js";
import { userAuth } from "../middlewares/role.middleware.js";


const router = Router()

router.get('/', userAuth , viewProductsController)

export default router