import mongoose from "mongoose"

const cartsSchema = new mongoose.Schema({
    products:
        [{
            pid:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Products"
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            _id: false
        }]
})

export const cartsModel = mongoose.model('Carts', cartsSchema)