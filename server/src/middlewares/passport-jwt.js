const passport = require("passport");
const JWTStategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { User } = require("../models");

// Estrategia de JSON Web Token (JWT)
passport.use(new JWTStategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET
}, async (jwtPayload, done) => {
	try {
		const user = await User.findOne({ where: { id: jwtPayload.id } });
		return done(null, user);
	} catch(error) {
		return done(error);
	}
}));