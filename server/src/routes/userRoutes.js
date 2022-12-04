const UserController = require("../controllers/UserController");
const { Router } = require("express");

const router = Router();

router
	.post("/register", UserController.registerUser);

module.exports = router;