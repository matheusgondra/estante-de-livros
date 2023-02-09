import AuthController from "../controllers/AuthController";
import { Router } from "express";
import passport from "passport";
import { handleValidate } from "../middlewares/validation";

const router = Router();

// Routes POST
router
	.post("/register", handleValidate, AuthController.register)
	.post("/login", passport.authenticate("local", { session: false }), AuthController.login);

export default router;