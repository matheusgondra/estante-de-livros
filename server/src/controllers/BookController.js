const models = require("../models");

class BookController {
	static async getAllBooks(req, res) {
		try {
			const books = await models.Book.findAll();
			return res.status(200).json(books);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}

	static async getBook(req, res) {
		const { id } = req.params;
		try {
			const book = await models.Book.findOne({ where: { id } });
			return res.status(200).json(book);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}
}

module.exports = BookController;