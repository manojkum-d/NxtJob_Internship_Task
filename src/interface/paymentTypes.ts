import mongoose, { Document } from "mongoose";

export interface IPayment extends Document {
  transactionId: mongoose.Types.ObjectId;
  paymentGateway: string;
  paymentStatus: "pending" | "success" | "failed";
  paymentDetails: string; // This will store encrypted payment details
  createdAt: Date;
  updatedAt: Date;
}
