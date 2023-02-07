import express from "express";
import routes from "./routes";
import passport from "passport";
import localStrategy from "./middlewares/passport-local";
import jwtStrategy from "./middlewares/passport-jwt";
import { version } from "../package.json";

const app = express();

app.get("/", (req, res) => {
	return res.status(200).json({ API: "Estante de livros API", version })
});

app.use(express.json());


passport.use(localStrategy);
passport.use(jwtStrategy)

routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});