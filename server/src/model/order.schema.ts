import { Schema, model, Types } from "mongoose";
import crypto from "crypto";

export const OrderItemSchema = new Schema(
  {
    productId: { type: Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, unique: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    farmerId: { type: Types.ObjectId, ref: "User", required: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

OrderSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderNumber) {
    let isUnique = false;
    while (!isUnique) {
      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase();
      const generated = `ORD-${datePart}-${randomPart}`;

      const existing = await Order.findOne({ orderNumber: generated });
      if (!existing) {
        this.orderNumber = generated;
        isUnique = true;
      }
    }
  }

  next();
});

export const Order = model("Order", OrderSchema);
