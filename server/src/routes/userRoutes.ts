import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/UserController";

const router = Router();
router.use(passport.authenticate("jwt", { session: false }));

// Routes GET
router.get("/getUser", UserController.getUser);

// Routes DELETE
router.delete("/deleteAccount", UserController.deleteUser);

// Routes PUT
router.put("/updateAccount", UserController.updateUser);

export default router;