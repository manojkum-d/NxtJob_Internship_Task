// controllers/paymentController.ts
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { Payment } from "./paymentModel";
import { Transaction, ITransaction } from "../transaction/transactionModel";
import logger from "../utils/logger";

export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, currency, paymentMethod, userId } = req.body;

    const transaction = await Transaction.create({
      userId,
      amount,
      currency,
      paymentMethod,
      status: "pending",
    });

    const payment = await Payment.create({
      transactionId: transaction._id,
      paymentGateway: "stripe", // Example gateway
      paymentStatus: "pending",
      paymentDetails: "encrypted_details_here", // In reality, this should be properly encrypted
    });

    logger.info(`Payment created: ${payment._id}`);
    res.status(201).json({ success: true, payment });
  } catch (error) {
    logger.error("Error creating payment:", error);
    next(createHttpError(500, "Error creating payment"));
  }
};

export const processPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);

    if (!payment) {
      throw createHttpError(404, "Payment not found");
    }

    // Here you would integrate with your actual payment gateway
    // For this example, we'll just simulate a successful payment
    payment.paymentStatus = "success";
    await payment.save();

    const transaction = await Transaction.findById(payment.transactionId);
    if (transaction) {
      transaction.status = "completed";
      await transaction.save();
    }

    logger.info(`Payment processed: ${payment._id}`);
    res.json({ success: true, payment });
  } catch (error) {
    logger.error("Error processing payment:", error);
    next(error);
  }
};

export const getPaymentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);

    if (!payment) {
      throw createHttpError(404, "Payment not found");
    }

    logger.info(`Payment status retrieved: ${payment._id}`);
    res.json({ success: true, status: payment.paymentStatus });
  } catch (error) {
    logger.error("Error retrieving payment status:", error);
    next(error);
  }
};

export const refundPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);

    if (!payment) {
      throw createHttpError(404, "Payment not found");
    }

    if (payment.paymentStatus !== "success") {
      throw createHttpError(400, "Payment cannot be refunded");
    }

    // Here you would integrate with your actual payment gateway to process the refund
    // For this example, we'll just simulate a successful refund
    payment.paymentStatus = "refunded";
    await payment.save();

    const transaction = await Transaction.findById(payment.transactionId);
    if (transaction) {
      transaction.status = "refunded";
      await transaction.save();
    }

    logger.info(`Payment refunded: ${payment._id}`);
    res.json({ success: true, payment });
  } catch (error) {
    logger.error("Error refunding payment:", error);
    next(error);
  }
};
