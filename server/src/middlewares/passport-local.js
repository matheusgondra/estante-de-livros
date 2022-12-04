const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models");

// Estrategia local (email e senha)
passport.use(new LocalStrategy(
		{
			usernameField: "email",
			session: false,
		},	async (email, password, done) => {
			try {
				const user = await User.findOne({ where: { email } });

				if (!user) {
					return done(null, false, {message: "Usuario não encontrado"});
				}

				if (!(await bcrypt.compare(password, user.password))) {
					return done(null, false, {message: "Senha incorreta"});
				}

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);
