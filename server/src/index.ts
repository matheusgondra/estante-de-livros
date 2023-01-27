import express from "express";
import routes from "./routes";
import strategy_local from "./middlewares/passport-local";
import strategy_jwt from "./middlewares/passport-jwt";

const app = express();

app.use(express.json());

routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});