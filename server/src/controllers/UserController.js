const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
	static async registerUser(req, res) {
		try {
			const newUser = req.body;
			newUser.password = await bcrypt.hash(newUser.password, 12);

			const createdUser = await models.User.create(newUser);

			createdUser.password = null;

			return res.status(201).json(createdUser);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async loginUser(req, res) {
		const user = req.user;
		const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: "30s" });
		// res.cookie("TokenTest", token, { maxAge: 1000 * 60 });
		return res.status(200).json({ token });
	}

	static async test(req, res) {
		return res.send("Teste!");
	}
}

module.exports = UserController;