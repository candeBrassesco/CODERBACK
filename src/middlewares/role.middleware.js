export const adminAuth = async ( req, res, next ) => {
    try {
        const {user} = req
        if (user.role !== "admin") {
            res.status(400).json({message: 'Not authorized'})
        }
        next()
    } catch (error) {
        return error
    }
}

export const userAuth = async ( req, res, next ) => {
    try {
        const {user} = req
        if (user.role !== "user") {
            res.status(400).json({message: 'Not authorized'})
        }
        next()
    } catch (error) {
        return error
    }
} 