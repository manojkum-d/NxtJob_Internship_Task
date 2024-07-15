import mongoose, { Document, Schema } from "mongoose";

interface IPayment extends Document {
  transactionId: mongoose.Types.ObjectId;
  paymentGateway: string;
  paymentStatus: "pending" | "success" | "failed" | "refunded";
  paymentDetails: string; // This will store encrypted payment details
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema({
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
  },
  paymentGateway: { type: String, required: true },
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  paymentDetails: { type: String, required: true }, // Encrypted payment details
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);

export { Payment, IPayment };
