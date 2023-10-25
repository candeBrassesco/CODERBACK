import { generateProduct } from "../mocks.js";

export const mockingProductsController = async ( req, res ) => {
    let products = []
    for(let i=0; i<100; i++) {
        products.push(generateProduct())
    }

    res.status(200).json({status: 'succes', payload: products})
}