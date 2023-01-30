import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

class BookController {
	static async getAllBooks(req: Request, res: Response) {
		try {
			const books = await prismaClient.book.findMany();
			return res.status(200).json(books);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}

	static async getBook(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const where = { id: Number(id) };
			const book = await prismaClient.book.findUnique({ where });
			return res.status(200).json(book);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}

	static async createBook(req: Request, res: Response) {
		try {
			const { title, author, page_number, read, user_id } = req.body;
			const createdBook = await prismaClient.book.create({
				data: {
					title,
					author,
					page_number,
					read,
					user_id
				}
			});
			return res.status(201).json(createdBook);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}
	
	static async updateBook(req: Request, res: Response) {
		const { id } = req.params;
		const newData = req.body;
		try {
			const where = { id: Number(id) };
			const data = { ...newData };

			await prismaClient.book.update({ where, data });

			const updatedBook = await prismaClient.book.findUnique({ where });

			return res.status(200).json(updatedBook);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}

	static async deleteBook(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const where = { id: Number(id) };
			await prismaClient.book.delete({ where });
			return res.status(200);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}
}

module.exports = BookController;