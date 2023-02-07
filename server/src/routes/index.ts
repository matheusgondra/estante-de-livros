import { Express } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import bookRoutes from "./bookRoutes";
import { handle404 } from "../middlewares/handle404";

export default (app: Express) => {
	app.use(authRoutes);
	app.use(userRoutes);
	app.use(bookRoutes);
	app.use(handle404);
}