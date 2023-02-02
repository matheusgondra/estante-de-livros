import express from "express";
import routes from "./routes";
import passport from "passport";
import localStrategy from "./middlewares/passport-local";
import jwtStrategy from "./middlewares/passport-jwt";

const app = express();

app.use(express.json());
passport.use(localStrategy);
passport.use(jwtStrategy)

routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});