const UserController = require("../controllers/UserController");
const { Router } = require("express");
const passport = require("passport");

const router = Router();

// Routes GET
router
	.get("/test", passport.authenticate("jwt", { session: false }), UserController.test);

// Routes POST
router
	.post("/register", UserController.registerUser)
	.post("/login", passport.authenticate("local", { session: false }), UserController.loginUser);

module.exports = router;