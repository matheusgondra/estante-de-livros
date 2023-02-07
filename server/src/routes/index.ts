import { Express } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import bookRoutes from "./bookRoutes";

export default (app: Express) => {
	app.use(authRoutes);
	app.use(userRoutes);
	app.use(bookRoutes);
}