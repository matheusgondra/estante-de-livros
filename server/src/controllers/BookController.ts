import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

class BookController {
	static async getAllBooks(req: Request, res: Response) {
		try {
			if (req.user) {
				const { user } = req;
				const books = await prismaClient.book.findMany({
					where: { user_id: user.id },
				});
				return res.status(200).json(books);
			}
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}

	static async getBook(req: Request, res: Response) {
		const { id } = req.params;
		try {
			if (req.user) {
				const { user } = req;
				const where = {
					id: Number(id),
					user_id: user.id,
				};
				const book = await prismaClient.book.findFirst({ where });
				return res.status(200).json(book);
			}
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}

	static async createBook(req: Request, res: Response) {
		try {
			if (req.user) {
				const { user } = req;
				const { title, author, page_number, read } = req.body;
				const createdBook = await prismaClient.book.create({
					data: {
						title,
						author,
						page_number,
						read,
						user_id: user.id,
					},
				});
				return res.status(201).json(createdBook);
			}
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}

	static async updateBook(req: Request, res: Response) {
		const { id } = req.params;
		const newData = req.body;
		try {
			if (req.user) {
				const { user } = req;
				const where = {
					id: Number(id),
					user_id: user.id,
				};
				const data = { ...newData };

				await prismaClient.book.update({ where: { id: Number(id) }, data });

				const updatedBook = await prismaClient.book.findFirst({ where });

				return res.status(200).json(updatedBook);
			}
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}

	static async deleteBook(req: Request, res: Response) {
		try {
			if (req.user) {
				const { id } = req.params;
				const where = { id: Number(id) };
				await prismaClient.book.delete({ where });
				return res.status(200).json({ message: "Resgistro deletado com sucesso!" });
			}
		} catch (error: any) {
			return res.status(500).json({ error: error.message, type_error: typeof(error) });
		}
	}
}

export default BookController;
