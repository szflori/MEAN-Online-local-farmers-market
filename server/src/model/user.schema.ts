import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

export enum ERole {
  USER = "USER",
  FARMER = "FARMER",
  ADMIN = "ADMIN",
}

const SALT_FACTOR = 10;

interface IUser extends Document {
  name: string;
  email: string;
  address?: string;
  password: string;
  role: string;
  bio: string;
  avatarUrl: string;
  createdAt: Date;
  favoriteFarmers: string[];
  comparePassword: (
    candidatePassword: string,
    callback: (error: Error | null, isMatch: boolean) => void
  ) => void;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, enum: ["USER", "FARMER", "ADMIN"], default: "USER" },
    bio: { type: String, required: false },
    avatarUrl: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    favoriteFarmers: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    collection: "users",
  }
);

UserSchema.pre<IUser>("save", function (next) {
  const user = this;

  // hash password
  bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
    if (error) {
      return next(error);
    }
    bcrypt.hash(user.password, salt, (err, encrypted) => {
      if (err) {
        return next(err);
      }
      user.password = encrypted;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  callback: (error: Error | null, isMatch: boolean) => void
): void {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
    if (error) {
      callback(error, false);
    }
    callback(null, isMatch);
  });
};

export const User = model("User", UserSchema);
