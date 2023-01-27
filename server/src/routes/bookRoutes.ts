import { Router } from "express";
import passport from "passport";
import BookController from "../controllers/BookController";

const router = Router();
router.use(passport.authenticate("jwt", { session: false }));

// Routes GET
router
	.get("/getBooks", BookController.getAllBooks)
	.get("/getBook", BookController.getBook);

// Routes POST
router
	.post("/registerBook", BookController.createBook);

// Routes PUT
router
	.put("/updateBook", BookController.updateBook);

// Routes DELETE
router
	.delete("/deleteBook", BookController.deleteBook);

export default router;