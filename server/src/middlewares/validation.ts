import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const userSchema = Joi.object({
	first_name: Joi.string().min(3).required(),
	last_name: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{6,}$/).required()
});

const bookSchema = Joi.object({
	title: Joi.string().required(),
	author: Joi.string().required(),
	page_number: Joi.number().integer().not().negative().required(),
	read: Joi.boolean(),
	favorite: Joi.boolean()
});

export const userValidate = (req: Request, res: Response, next: NextFunction) => {
	const { error } = userSchema.validate(req.body);

	if(error) {
		res.status(422).json({ error: "Erro de validação" });
	} 
	
	next();
}

export const bookValidate = (req: Request, res: Response, next: NextFunction) => {
	const { error } = bookSchema.validate(req.body);

	if(error) {
		res.status(422).json({ error: "Erro de validação" });
	} 
	
	next();
}