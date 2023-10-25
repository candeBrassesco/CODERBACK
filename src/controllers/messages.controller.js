import messageManager from "../dal/dao/mongoManagers/MessageManager.js";
import { socketServer } from "../app.js";

export const getMessagesController = async ( req, res ) => {
    const messages = await messageManager.getMessages()

    socketServer.on("connection", socket => {
        console.log(`User connected: ${socket.id}`)

        socket.on("disconnect", () => {
            console.log(`User disconnected`)
        })

        socket.on("newUser", (user) => {
            console.log(`User:`, user)
        })

        socket.on("message", async (info) => {
            messages.push(info)
            socketServer.emit("chat", messages)
            await messageManager.createMessage(info)
        })
    })

}