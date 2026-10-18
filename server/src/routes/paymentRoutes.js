import express from "express";
import { addPayment } from "../controllers/paymentController.js";
import { getAllPayments } from "../controllers/paymentController.js";
import { getSpecificPaymentDetail } from "../controllers/paymentController.js";
import { editSpecificPayment } from "../controllers/paymentController.js";
import { getPaymentSummary } from "../controllers/paymentController.js";
import { deleteSpecificPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", addPayment);

router.get("/", getAllPayments);

router.get("/summary",getPaymentSummary);

router.get("/:paymentId", getSpecificPaymentDetail)

router.patch("/edit/:paymentId", editSpecificPayment);

router.delete("/:paymentId", deleteSpecificPayment);

export default router;