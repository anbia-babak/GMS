import express from "express";
import {
    getIncomeReport,
    getPaymentReport,
    getMembershipReport,
    getMemberReport
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/income", getIncomeReport);
router.get("/payments", getPaymentReport);
router.get("/memberships", getMembershipReport);
router.get("/members", getMemberReport);

export default router;
