import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Response } from "express";

export const PrismaErrorHandler = (err: any, res: Response) => {
	if(err instanceof PrismaClientKnownRequestError) {
		switch(err.code) {
			case "P2002":
				return res.status(400).json({ error: `O campo ${err.meta?.target} deve ser unico`});
			case "P2025":
				return res.status(404).json({ error: `O registro a ser deletado não existe` });
		} 
	}
	return res.status(500).json({ error: err.message });
}