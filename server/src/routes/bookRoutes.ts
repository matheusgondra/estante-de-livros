import { Router } from "express";
import passport from "passport";
import BookController from "../controllers/BookController";
import { bookValidate } from "../middlewares/validation";

const router = Router();
router.use(passport.authenticate("jwt", { session: false }));

// Routes GET
router
	.get("/getBooks", BookController.getAllBooks)
	.get("/getBook/:id", BookController.getBook);

// Routes POST
router
	.post("/registerBook", bookValidate, BookController.createBook);

// Routes PUT
router
	.put("/updateBook/:id", BookController.updateBook);

// Routes DELETE
router
	.delete("/deleteBook/:id", BookController.deleteBook);

export default router;