import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const userSchema = Joi.object({
	first_name: Joi.string().min(3).required(),
	last_name: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{6,}$/).required()
});

export const userValidate = (req: Request, res: Response, next: NextFunction) => {
	const { error } = userSchema.validate(req.body);

	if(error) {
		res.status(422).json({ error: "Erro de validação" });
	} 
	
	next();
}