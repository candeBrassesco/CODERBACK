import {Router} from 'express'
import { addProductController, deleteProductController, getProductByIdController, getProductsController, updateProductController } from '../controllers/products.controllers.js'
import { adminAuth } from '../middlewares/role.middleware.js'

const router = Router()

router.get("/", getProductsController)

router.get("/:pid", getProductByIdController)

router.post('/', adminAuth, addProductController)

router.delete('/:pid', adminAuth, deleteProductController)

router.put('/:pid', adminAuth, updateProductController)

export default router
