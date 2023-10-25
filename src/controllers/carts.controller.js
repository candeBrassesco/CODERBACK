import cartManager from "../dal/dao/mongoManagers/CartManager.js";

export const getCartsController = async ( req, res ) => {
    try {
        const carts = await cartManager.getCarts()
        res.status(200).json({carts})
    } catch (error) {
        res.status(500).json({error})
    }
}

export const  getCartByIdController = async ( req, res ) => {
    const {cid} = req.params
    try {
        const cartById = await cartManager.getCartsById(cid)
        res.status(200).json({message:'Cart', cartById})
    } catch (error) {
        res.status(500).json({error})
    }
}

export const addCartController = async ( req, res ) => {
    try {
        const newCart = await cartManager.addCart(req.body)
        res.status(200).json({message: 'Cart added', cart: newCart})
    } catch (error) {
        res.status(500).json({error})
    }
}

export const addProductToCartController = async ( req, res ) => {
    const {cid, pid} = req.params
    try {
        const newProductAdded = await cartManager.addProductToCart(cid, pid)
        res.status(200).json({message: 'Product added to cart', product: newProductAdded}) 
    } catch (error) {
        res.status(500).json({error})
    }
}

export const updateCartController = async ( req, res ) => {
    const {cid} = req.params
    const products = req.body
    try {
        const response = await cartManager.updateCart(products, cid)
        res.status(200).json({message:'Cart updated', response})
    } catch (error){
        res.status(500).json({error})
    }
}

export const updateQuantityController = async ( req, res ) => {
    const {cid, pid} = req.params
    const quantity = req.body
    try {
        const productUpdated = await cartManager.updateQuantity(quantity, cid, pid)
        res.status(200).json({message: 'Quantity updated', productUpdated})
    } catch (error){
        res.status(500).json({error})
    }
}

export const deleteCartController = async ( req, res ) => {
    const {cid} = req.params
    try {
        const response = await cartManager.deleteCart(cid)
        res.status(200).json({message:'Cart deleted', response})
    } catch (error){
        res.status(500).json({error})
    }
}

export const deleteProductOnCartController = async ( req, res ) => {
    const {cid, pid} = req.params
    try {
        const response = await cartManager.deleteProductOnCart(cid, pid)
        res.status(200).json({message: 'Product deleted', response})
    } catch (error) {
        res.status(500).json({error})
    }
}

export const viewCartControler = async ( req, res ) => {
    const {cid} = req.params
    try {
        const cart = await cartManager.getCartsById(cid)
        const cartProducts = cart.products
        res.render("cart", {products: cartProducts})
    } catch (error) {
        res.status(500).json({error})
    }
}

export const purchaseCartController = async ( req, res ) => {
    const {cid} = req.params
    const {user} = req
    try {
        const purchase = await cartManager.purchaseCart(cid, user)
        res.status(200).json({message: 'Products bought', purchase})
    } catch (error) {
        res.status(500).json({error})
    }
}

