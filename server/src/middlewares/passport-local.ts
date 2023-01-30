import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { prismaClient } from "../database/prismaClient";

// Estrategia local (email e senha)
passport.use(new LocalStrategy(
		{
			usernameField: "email",
			session: false,
		},	async (email, password, done) => {
			try {
				const where = { email };
				const user = await prismaClient.user.findFirst({ where });

				if (!user) {
					return done(null, false, { message: "Usuario não encontrado" });
				}

				if (!(await bcrypt.compare(password, user.password))) {
					return done(null, false, { message: "Senha incorreta" });
				}
					
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);
