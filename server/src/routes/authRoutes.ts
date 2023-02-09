import AuthController from "../controllers/AuthController";
import { Router } from "express";
import passport from "passport";
import { userValidate } from "../middlewares/validation";

const router = Router();

// Routes POST
router
	.post("/register", userValidate, AuthController.register)
	.post("/login", passport.authenticate("local", { session: false }), AuthController.login);

export default router;