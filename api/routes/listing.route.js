import express from "express";
import {
  createListing,
  deleteThisListing,
  getThisListing,
  updateThisListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteThisListing);
router.patch("/update/:id", verifyUser, updateThisListing);
router.get("/getListing/:id", getThisListing);
export default router;
