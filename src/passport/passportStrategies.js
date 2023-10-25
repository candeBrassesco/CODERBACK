import passport from "passport";
import { usersModel } from "../dal/db/models/users.models.js";
import { cartsModel } from "../dal/db/models/carts.models.js";
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt"
import { compareData, cookieExtractor } from "../utils.js";
import { hashData } from "../utils.js";
import config from "../config.js";


const JWT_SECRET_KEY = config.JWT_SECRET_KEY

// local strategy

passport.use('login', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    async (req, email, password, done) => {
    try {
        const user = await usersModel.findOne({ email })
        if (!user) {
            return done(null, false)
        }
        const isPassword = await compareData(password, user.password)
        if (isPassword) {
            done(null, user)
        }
    } catch (error) {
        done(error)
    }
}))

passport.use('register', new LocalStrategy(
    async (req, email, password, done) => {
    try {
        const user = await usersModel.findOne({ email })
        if (user) {
            return done (null, false)
        }
        const hashPassword = await hashData(password)
        const newUser = { ...req.body, password: hashPassword }
        const userDB = await usersModel.create(newUser)
        done(null, userDB)
    } catch (error) {
        done(error)
    }
}
))

//github strategy

passport.use(new GithubStrategy({
    clientID: 'Iv1.951aef74a091d5dd',
    clientSecret: 'bd230677e69cc71a930aec10643d7a20cefee8c2',
    callbackURL: "http://localhost:8080/api/session/github"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await usersModel.findOne({ email: profile._json.email })
        if (user) {
            done(null, false)
        }
        if (profile._json.email === 'adminCoder@coder.com') {
            const newUser = {
                first_name: profile._json.name.split(' ')[0],
                last_name: profile._json.name.split(' ')[1] || ' ',
                email: profile._json.email,
                password: ' ',
                role: 'admin'
            }
            const userDB = await usersModel.create(newUser)
            done(null, userDB)
        }
        const usersCart = await cartsModel.create({})
        const newUser = {
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email,
            password: ' ',
            cart: usersCart
        }
        const userDB = await usersModel.create(newUser)
        done(null, userDB)
        
    } catch (error) {
        done(error)
    }
}
));

// jwt strategy + cookies
passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRET_KEY
}, async (jwt_payload, done) => {
    done(null, jwt_payload.user)
}))


// user => ID
passport.serializeUser((user, done) => {
    done(null, user._id)
})

// ID => user data
passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersModel.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
}) 