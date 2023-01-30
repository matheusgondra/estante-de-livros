import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

interface IUser {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	created_at: Date;
	updated_at: Date;
}

class UserController {
	static async registerUser(req: Request, res: Response) {
		try {
			const { first_name, last_name, email, password } = req.body;

			const newUser = { first_name, last_name, email, password };

			newUser.password = await bcrypt.hash(newUser.password, 12);

			const createdUser = await prismaClient.user.create({
				data: {
					...newUser
				}
			});

			return res.status(201).json(createdUser);
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}

	static async loginUser(req: Request, res: Response) {
		const user = req.user as IUser;

		if (user) {
			const token = jwt.sign({ id: user.id }, process.env.SECRET as string, { expiresIn: "30s" });
			return res.status(200).json({ token });
		}

	}
}

export default UserController;