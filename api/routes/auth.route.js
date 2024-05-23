import express from "express";
import { google, signIn, signOutUser, signUp } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);
router.get("/signout", signOutUser);

export default router;
