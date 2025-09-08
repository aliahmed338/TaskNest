import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      minlength: 6,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET undefined ");
  }
  return jwt.sign({ id: this._id }, secret, { expiresIn: "7d" });
};

userSchema.methods.comparePassword = async function (enterdPassword: string) {
  return await bcrypt.compare(enterdPassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
