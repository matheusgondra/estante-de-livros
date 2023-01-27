import passport from "passport";
import { Strategy as JWTStategy, ExtractJwt} from "passport-jwt";
const { User } = require("../models");

// Estrategia de JSON Web Token (JWT)
passport.use(new JWTStategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET
}, async (jwtPayload, done) => {
	try {
		const user = await User.findOne({ where: { id: jwtPayload.id } });
		return done(null, user);
	} catch(error) {
		return done(error);
	}
}));