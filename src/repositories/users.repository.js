import cartManager from "../dal/dao/mongoManagers/CartManager.js";
import { usersModel } from "../dal/db/models/users.models.js";
import { hashData } from "../utils.js";


class UsersRepository {

    async createUser(user) {
        try {
           const { email, password } = user
           const userExists = await usersModel.findOne({email})
           if (userExists) {
              throw new Error ('The user already exists')
           }
           if (email === 'adminCoder@coder.com') {
            const hashPassword = await hashData(password)
            const newUser = {
                ...user,
                password: hashPassword,
                role:'admin'
            }
            return newUser
           }
           const hashPassword = await hashData(password)
           const usersCart = await cartManager.addCart()
           const newUser = {
               ...user,
               password: hashPassword,
               cart: usersCart
           }
           return newUser
        } catch (error) {
            return error
        }
    }

    async findUser(email) {
        try {
            const user = await usersModel.findOne({ email })
            return user
        } catch (error) {
            return error
        }
    }

    async updateOne(idUser, idCart) {
        try {
            const updateUser = await usersModel.updateOne({ _id: idUser }, { $set: { cart: idCart } })
            return updateUser
        } catch (error) {
            return error
        }
    }

    async findUsersCart(email) {
        try {
            const user = await usersModel.findOne({ email })
            return user.cart
        } catch (error) {
            return error
        }
    }
}

const usersRepository = new UsersRepository()
export default usersRepository