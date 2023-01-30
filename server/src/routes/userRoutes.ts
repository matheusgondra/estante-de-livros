import UserController from "../controllers/UserController";
import { Router } from "express";
import passport from "passport";

const router = Router();

// Routes POST
router
	.post("/register", UserController.registerUser)
	.post("/login", passport.authenticate("local", { session: false }), UserController.loginUser);

export default router;