import { Schema, model, Types } from "mongoose";

export enum EProductCategory {
  VEGETABLES = "vegetables",
  FRUITS = "fruits",
  DAIRY = "dairy",
  MEAT = "meat",
  BAKERY = "bakery",
  HONEY_JAMS = "honey-jams",
  BEVERAGES = "beverages",
  HANDMADE = "handmade",
  NATURAL_COSMETICS = "natural-cosmetics",
  BIO = "bio",
  SEASONAL = "seasonal",
  CSA = "csa",
}

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: Object.values(EProductCategory),
      required: true,
    },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    farmerId: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    collection: "products",
  }
);

export const Product = model("Product", ProductSchema);
