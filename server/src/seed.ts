import mongoose from "mongoose";
import dotenv from "dotenv";
import { ERole, User } from "./model/user.schema";
import { EProductCategory, Product } from "./model/product.schema";
import { Order } from "./model/order.schema";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/db";

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  // Töröljük a meglévő adatokat
  await User.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});

  // Hashed jelszó
  const hashedPassword =
    "$2b$10$fn.zXLR4GHE0GrNATgPYWukfht..vCaQo..LPtHnvB.hcxoRfW8Be";

  // Farmerek
  const farmers = await User.insertMany([
    {
      name: "Kovács Gazda",
      email: "gazda1@example.com",
      password: hashedPassword,
      role: ERole.FARMER,
      location: "Szentes",
      bio: "Helyi friss zöldségek",
      avatarUrl:
        "https://t3.ftcdn.net/jpg/03/80/27/88/360_F_380278806_hU362lmcYRqkb8reIageNj4Qh7ID9mIg.jpg",
    },
    {
      name: "Nagy Biofarm",
      email: "biofarm@example.com",
      password: hashedPassword,
      role: ERole.FARMER,
      location: "Kecskemét",
      bio: "Biotermékek szeretettel",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNtJpIX7LjyDba9UGNixifzF04tNYmnPBPIg&s",
    },
  ]);

  // Felhasználó
  const user = await User.create({
    name: "Teszt Felhasználó",
    email: "user@example.com",
    password: "asdASD123",
    role: ERole.USER,
  });

  // Admin
  await User.create({
    name: "Admin Felhasználó",
    email: "admin@example.com",
    password: "asdASD123",
    role: ERole.ADMIN,
  });

  // Termékek
  const products = await Product.insertMany([
    {
      name: "Paradicsom",
      description: "Friss házi paradicsom",
      category: EProductCategory.VEGETABLES,
      price: 500,
      stock: 30,
      farmerId: farmers[0]._id,
      isPreorder: false,
      imageUrl:
        "https://kakaobab.com/cdn/shop/articles/sambiranogold-paradicsom_1e86b753-79e4-42b9-a99b-8f7b24db284f.jpg?v=1586249760",
    },
    {
      name: "Uborka",
      description: "Kertből frissen",
      category: EProductCategory.VEGETABLES,
      price: 300,
      stock: 50,
      farmerId: farmers[0]._id,
      isPreorder: false,
      imageUrl:
        "https://tudatosvasarlo.hu/wp-content/uploads/eric-prouzet-Ky6x9T8j128-unsplash-1.jpg",
    },
    {
      name: "Alma",
      category: EProductCategory.FRUITS,
      description: "Édes magyar alma",
      price: 400,
      stock: 20,
      farmerId: farmers[1]._id,
      isPreorder: false,
      imageUrl:
        "https://gyogyszernelkul.com/wp-content/uploads/2017/11/tapanyagot-es-egeszseget-ad-zold-alma.jpg",
    },
  ]);

  await Order.create({
    userId: user._id,
    farmerId: farmers[0]._id,
    items: [
      {
        productId: products[0]._id,
        quantity: 2,
        price: products[0].price,
      },
      {
        productId: products[1]._id,
        quantity: 2,
        price: products[1].price,
      },
    ],
    total: 2 * products[0].price + 2 * products[1].price,
    status: "COMPLETED",
    address: user.address || "6724 Szeged Asd 1/C",
    phone: "0612345678",
    createdAt: new Date(),
  });

  console.log("✅ Dummy adatok betöltve!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed hiba:", err);
  process.exit(1);
});
