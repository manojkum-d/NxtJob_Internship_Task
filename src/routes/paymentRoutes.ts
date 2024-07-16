// routes/paymentRoutes.ts
import express from "express";
import {
  createPayment,
  processPayment,
  getPaymentStatus,
  refundPayment,
} from "../controller/payments/paymentController";

const paymentRoutes = express.Router();

paymentRoutes.post("/create", createPayment);
paymentRoutes.post("/process/:id", processPayment);
paymentRoutes.get("/status/:id", getPaymentStatus);
paymentRoutes.post("/refund/:id", refundPayment);

export default paymentRoutes;
