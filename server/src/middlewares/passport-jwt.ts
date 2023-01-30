import passport from "passport";
import { Strategy as JWTStategy, ExtractJwt} from "passport-jwt";
import { prismaClient } from "../database/prismaClient";

// Estrategia de JSON Web Token (JWT)
passport.use(new JWTStategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET
}, async (jwtPayload, done) => {
	try {
		const user = await prismaClient.user.findUnique({ where: { id: jwtPayload.id } });
		if(user) {
			return done(null, user);
		}
	} catch(error) {
		return done(error);
	}
}));