import {Router} from 'express'
import { addCartController, addProductToCartController, deleteCartController, deleteProductOnCartController, getCartByIdController, getCartsController, purchaseCartController, updateCartController, updateQuantityController } from '../controllers/carts.controller.js'
import { userAuth } from '../middlewares/role.middleware.js'

const router = Router()

router.get('/', getCartsController)

router.get('/:cid', getCartByIdController)

router.post('/', addCartController )

router.post('/:cid/product/:pid', userAuth, addProductToCartController )

router.put('/:cid', updateCartController)

router.put('/:cid/product/:pid', updateQuantityController)

router.delete('/:cid', deleteCartController)

router.delete('/:cid/product/:pid', deleteProductOnCartController)

router.get('/:cid/purchase', purchaseCartController)

export default router