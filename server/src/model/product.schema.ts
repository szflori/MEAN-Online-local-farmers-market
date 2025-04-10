import { Schema, model, Types } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: false },
    category: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    farmerId: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    collection: "products",
  }
);

export const Product = model("Product", ProductSchema);
