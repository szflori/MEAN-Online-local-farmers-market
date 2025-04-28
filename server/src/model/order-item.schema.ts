import { Schema, model, Types } from "mongoose";

export const OrderItemSchema = new Schema(
  {
    productId: { type: Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

export const OrderItem = model("OrderItem", OrderItemSchema);
