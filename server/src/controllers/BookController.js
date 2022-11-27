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

	static async createBook(req, res) {
		try {
			const data = req.body;
			const createdBook = await models.Book.create(data);
			return res.status(201).json(createdBook);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}
	
	static async updateBook(req, res) {
		const { id } = req.params; 
		const newData = req.body;
		try {
			await models.Book.update(newData, { where: { id } });	
			const updatedBook = await models.Book.findOne({ where: { id } });
			return res.status(200).json(updatedBook);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}

	static async deleteBook(req, res) {
		const { id } = req.params;
		try {
			await models.Book.destroy({ where: { id } });
			return res.status(200);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}
}

module.exports = BookController;