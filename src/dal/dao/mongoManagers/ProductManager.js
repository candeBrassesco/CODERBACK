import productsRepository from "../../../repositories/products.repository.js";

class ProductManager {

    async getProducts( limit, page, sort, query ){
        try {
            const products = await productsRepository.getProducts(limit, page, sort, query)
            return products
        } catch (error) {
            return error
        }
    }

    async addProduct(obj) {
        try {
            const newProduct = await productsRepository.addProduct(obj)
            return newProduct
        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const product = await productsRepository.getProductById(id)
            return product
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const deleteProduct = await productsRepository.deleteProduct(id)
            return deleteProduct
        } catch (error) {
            return error
        }
    }

    async updateProduct( id, obj ) {
        try {
            const updateProduct = await productsRepository.updateProduct( id, obj )
            return updateProduct
        } catch (error) {
            return error
        }
    }

    async updateProductStock ( id, stock ) {
        try{
            const updateStock = await productsRepository.updateProductStock( id, stock )
            return updateStock
        } catch (error) {
            return error
        }
    }
}

const productManager = new ProductManager()
export default productManager