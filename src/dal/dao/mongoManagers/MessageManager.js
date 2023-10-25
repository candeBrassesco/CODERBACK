import messageRepository from "../../../repositories/messages.repository.js";

class MessageManager {

    async getMessages () {
        try {
            const messages = await messageRepository.getMessages()
            return messages
        } catch (error) {
            return error
        }
    }

    async createMessage (message) {
        try {
            const newMessage = await messageRepository.createMessages(message)
            return newMessage
        } catch (error) {
            return error
        }
    }

}

const messageManager = new MessageManager()
export default messageManager