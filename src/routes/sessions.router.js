import { Router } from "express";
import passport from "passport";
import { loginUserController, logoutUserController, registerUserController } from "../controllers/users.controller.js";
import SessionDTO from "../dal/dto/sessions.dto.js";

const router = Router()

router.post('/register', registerUserController)

router.post("/login", passport.authenticate("login",{failureRedirect: "/api/views/loginError", successRedirect: "/products", passReqToCallback: true}))

//register con Github
router.get('/registerGithub', passport.authenticate("github", { scope: [ 'user:email' ] }))

router.get('/github', passport.authenticate("github", {failureRedirect:'/api/views/registerError'}), async (req,res) =>{
    req.session.email = req.user.email
    res.redirect("/products/")
})

router.get('/logout', logoutUserController)

router.get("/current", passport.authenticate("jwt", {session:false}), (req, res)=>{
    const userDTO = new SessionDTO(req.user)
    res.send(userDTO)
})


//router.post('/login', loginUserController)

export default router