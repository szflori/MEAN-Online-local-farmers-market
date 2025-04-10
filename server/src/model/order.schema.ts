import { Schema, model, Types } from "mongoose";

const OrderSchema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    total: { type: Number, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    collection: "orders",
  }
);

export const Order = model("Order", OrderSchema);
