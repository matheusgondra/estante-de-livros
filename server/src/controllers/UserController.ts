import bcrypt from "bcrypt";
import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";
import { UserErrorController } from "./UserErrorController";

class UserController {
	static async getUser(req: Request, res: Response) {
		try {
			if(req.user) {
				const { user } = req;
				const _user = { ...user, password: undefined }
				return res.status(200).json(_user);
			}
		} catch (error: any) {
			return res.status(500).json({ error: error.message });
		}
	}

	static async deleteUser(req: Request, res: Response) {
		try {
			if(req.user) {
				const { user } = req;
				const { password } = req.body;

				if(await bcrypt.compare(password, user.password)) {
					const where = { id: Number(user.id) }
					await prismaClient.user.delete({ where });
					return res.status(200).json({ message: "Usuário deletado" });
				} else {
					throw new UserErrorController("Senha incorreta", 401);
				}
			}
		} catch (error: any) {
			if(error instanceof UserErrorController) {
				return res.status(error.statusCode).json({ error: error.message });
			} else {
				return res.status(500).json({ error: error.message });
			}
		}
	}

	static async updateUser(req: Request, res: Response) {
		try {
			if(req.user) {
				const { user } = req;
				const { password } = req.body;
				const data = req.body;

				if(await bcrypt.compare(password, user.password)) {
					const where = { id: Number(user.id) }
					const updatedUSer = await prismaClient.user.update({ 
						where,
						data,
						select: {
							id: true,
							first_name: true,
							last_name: true,
							email: true,
							created_at: true,
							updated_at: true
						}
					})
					return res.status(200).json(updatedUSer);
				} else {
					throw new UserErrorController("Senha incorreta", 401)
				}
			}
		} catch (error: any) {
			if(error instanceof UserErrorController) {
				return res.status(error.statusCode).json({ error: error.message });
			} else {
				return res.status(500).json({ error: error.message });
			}
		}
	}
}

export default UserController;