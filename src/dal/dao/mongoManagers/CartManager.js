import cartsRepository from "../../../repositories/carts.repository.js"


class CartManager {

    async getCarts() {
        try {
            const carts = await cartsRepository.getCarts()
            return carts
        } catch (error){
            return error
        }
    }

    async getCartsById(id) {
        try {
            const cart = await cartsRepository.getCartsById(id)
            return cart
        } catch (error) {
            return error
        }
    }

    async addCart() {
        try {
            const newCart = await cartsRepository.addCart()
            return newCart
        } catch (error) {
            return error
        }
    }
    
    async addProductToCart(cid, pid) {
        try {
          const product = await cartsRepository.addProductToCart( cid, pid )
          return product
        } catch (error) {
          return error
        }
    }
  
    async deleteCart(cid) {
        try {
           const deleteCart = await cartsRepository.deleteCart(cid)
           return deleteCart
        } catch (error) {
            return error
        }
    }

    async deleteProductOnCart(cid, pid) {
        try {
            const productDeleted = await cartsRepository.deleteProductOnCart( cid, pid )
            return productDeleted
        } catch (error) {
            return error
        }
    }

    async updateCart( products, cid)  {
        try {
            const cartUpdated = await cartsRepository.updateCart( products, cid )
            return cartUpdated
        } catch (error) {
            return error
        }
    }

    async updateQuantity (quantity, cid, pid) {
        try {
            const updateQuant = await cartsRepository.updateQuantity( quantity, cid, pid )
            return updateQuant
        } catch (error) {
            return error
        }
    }

    async purchaseCart (cid, user) {
        try {
            const response = await cartsRepository.purchaseCart(cid, user)
            return response
        } catch (error) {
            return error
        }
    }

}

const cartManager = new CartManager()
export default cartManager
