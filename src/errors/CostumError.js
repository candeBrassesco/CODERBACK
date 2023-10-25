export default class CostumError {
    static createError ({name = "Error", message = "Message"}) {
        const error = new Error()
        error.name = name
        error.message = message
        return error
    }
}