const models = require("../models");
const bcrypt = require("bcrypt");

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
}

module.exports = UserController;