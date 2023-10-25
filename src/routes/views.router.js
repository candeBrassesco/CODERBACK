import { Router } from "express";
import { privateAcces, publicAcces } from "../middlewares/acces.middleware.js";
import { loginErrorViewController, loginViewController, profileViewController, registerErrorViewController, registerViewController } from "../controllers/users.controller.js";

const router = Router()


router.get('/login', publicAcces, loginViewController)

router.get('/register', publicAcces, registerViewController)

router.get('/profile', privateAcces, profileViewController)

router.get('/registerError', registerErrorViewController)

router.get('/loginError', loginErrorViewController)

export default router