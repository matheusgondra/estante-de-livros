import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const schema = Joi.object({
	first_name: Joi.string().min(3).required(),
	last_name: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{6,}$/).required()
});

export const handleValidate = (req: Request, res: Response, next: NextFunction) => {
	const { error } = schema.validate(req.body);

	if(error) {
		res.status(422).json({ error: "Erro de validação" });
	} 
	
	next();
}