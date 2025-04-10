import { Schema, model, Types } from "mongoose";

const OrderItemSchema = new Schema(
  {
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    orderId: { type: Types.ObjectId, ref: "Order", required: true },
    productId: { type: Types.ObjectId, ref: "Product", required: true },
  },
  {
    collection: "order_items",
  }
);

export const OrderItem = model("OrderItem", OrderItemSchema);
