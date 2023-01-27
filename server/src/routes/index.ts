import { Express } from "express";
import userRoutes from "./userRoutes";
import bookRoutes from "./bookRoutes";

export default (app: Express) => {
	app.use(userRoutes);
	app.use(bookRoutes);
}