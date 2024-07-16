import mongoose, { Document, Schema } from "mongoose";
import { ITransaction } from "../transaction/transactionTypes";

const TransactionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  paymentMethod: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);

export { Transaction, ITransaction };
