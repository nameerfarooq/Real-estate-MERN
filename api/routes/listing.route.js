import express from "express";
import {
  createListing,
  deleteThisListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteThisListing);
export default router;
