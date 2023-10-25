import fs from 'fs'

class ProductManager {
    constructor(path) {
       this.path = path
    }
    
// Método para leer el archivo de productos y devolverlo en forma de arreglo.
    async getProducts () {
        try {
            if (fs.existsSync(this.path)) {
                const archivedInfo = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(archivedInfo)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProduct (obj) {
        try {
            const productsPrev = await this.getProducts()

            let id 
            if (!productsPrev.length){
                id = 1
            } else {
                id = productsPrev[productsPrev.length - 1].id + 1
            }
            const codeExist = productsPrev.find(p => p.code === obj.code)

            // Verificacion de la existencia de todas las keys y repetición del value del code.
            if (!obj.title || !obj.description || !obj.price || !obj.code || !obj.stock) {
                throw new Error('Please enter all the parameters to add a new product: title, description, price, thumbnail, code and stock');
            }
            if (codeExist) {
                throw new Error(`The code: ${obj.code} already exists. Please enter another one!`)
            }
            const newProduct = {...obj, id}
            productsPrev.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(productsPrev))
            return newProduct
        } catch(error) {
            console.log(error)
            return error
        }
    }

    async getProductById (id) {
        try {
            const productsPrev = await this.getProducts()
            const product = productsPrev.find(p => p.id == id)
            if (!product) {
               return 'ID not found'
            } 
            return product
        } catch (error){
            return error
        }
    }

    async updateProduct (id, obj) {
        try {
            const productsPrev = await this.getProducts()
            const productIndex = productsPrev.findIndex(p => p.id == id)
            if (productIndex === -1) {
                return 'No product found with the ID setted'
            }
            const product = productsPrev[productIndex]
            productsPrev[productIndex] = { ...product, ...obj }
            await fs.promises.writeFile(this.path, JSON.stringify(productsPrev))
            
        } catch (error) {
            return error
        }
    }

    async deleteProduct (id) {
        try {
            const productsPrev = await this.getProducts()
            const newProductsArray = productsPrev.filter(p => p.id != id)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(newProductsArray)
            ) 
        } catch (error) {
            return error
        }
    }
}

const productManager = new ProductManager('products.json')
export default productManager
