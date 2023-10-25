import jwt from 'jsonwebtoken'


const JWT_SECRET_KEY = 'secretJWT'

export const jwtValidation = ( req, res, next ) => {
    try {
        const token = req.cookies.token
        const response = jwt.verify( token, JWT_SECRET_KEY )
        req.user = response.user
        next()

    } catch (error) {
        res.status(500).json({message: error})
    }
}