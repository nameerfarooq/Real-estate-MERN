import express from "express";
import {
  createListing,
  deleteThisListing,
  updateThisListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteThisListing);
router.patch("/update/:id", verifyUser, updateThisListing);
export default router;
