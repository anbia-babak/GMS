import express from "express";
import { getMembers } from "../controllers/memberController.js";
import { addMember } from "../controllers/memberController.js";
import { getSpecificMember } from "../controllers/memberController.js";
import { editSpecificMember } from "../controllers/memberController.js";
import { deactivateSpecificMember } from "../controllers/memberController.js";

// Creating the Router:
const router = express.Router();

// Getting all the members:
router.get("/", getMembers);

// Adding a new member:
router.post("/", addMember);

// Getting a specific member:
router.get("/:id", getSpecificMember);

// Editing a specific member:
router.patch("/:id", editSpecificMember);

// Deactiviting a specific member:
router.patch("/:id/status", deactivateSpecificMember)
export default router;