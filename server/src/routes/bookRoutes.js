const { Router } = require("express");
const BookController = require("../controllers/BookController");
const passport = require("passport");

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

module.exports = router;