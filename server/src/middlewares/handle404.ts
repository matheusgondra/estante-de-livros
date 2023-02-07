import { Request, Response, NextFunction } from "express";

export const handle404 = (req: Request, res: Response, next: NextFunction) => {
	return res.status(404).json({ message: "Rota inválida!" })
}