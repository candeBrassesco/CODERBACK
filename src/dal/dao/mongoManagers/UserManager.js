import usersRepository from "../../../repositories/users.repository.js"
import { usersModel } from "../../db/models/users.models.js"

class UserManager {

    async createUser(user) {
       try {
          const newUser = await usersRepository.createUser(user)
          const userDB = await usersModel.create(newUser)
          return userDB
       } catch (error) {
          return error
       }
    }

    async findUser(email) {
        try {
            const user = await usersRepository.findUser(email)
            return user
        } catch (error) {
            return error
        }
    }

    async updateOne(idUser, idCart){
        try {
            const updateUser = await usersRepository.updateOne(idUser, idCart)
            return updateUser
        } catch (error) {
            return error
        }
    }

    async findUsersCart (email) {
        try {
            const usersCart = await usersRepository.findUsersCart(email)
            return usersCart
        } catch (error) {
            return error
        }
    }
}

const userManager = new UserManager
export default userManager