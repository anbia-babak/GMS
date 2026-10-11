import express from "express";
import { addMembership } from "../controllers/membershipController.js";
import { getSpecificMemberCMemberships } from "../controllers/membershipController.js";
import { editSpecificMembership } from "../controllers/membershipController.js"; 
import { getAllMemberships } from "../controllers/membershipController.js";
import { getSpecificMembership } from "../controllers/membershipController.js";
import { renewSpecificMembership } from "../controllers/membershipController.js";

const router = express.Router();

router.post("/", addMembership);

router.get("/member/:memberId", getSpecificMemberCMemberships);

router.patch("/:membershipId", editSpecificMembership);

router.get("/", getAllMemberships);

router.get("/:membershipId", getSpecificMembership);

router.post("/:membershipId/renew", renewSpecificMembership);

export default router;