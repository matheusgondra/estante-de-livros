import AuthController from "../controllers/AuthController";
import { Router } from "express";
import passport from "passport";

const router = Router();

// Routes POST
router
	.post("/register", AuthController.register)
	.post("/login", passport.authenticate("local", { session: false }), AuthController.login);

export default router;