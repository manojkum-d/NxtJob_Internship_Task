import mongoose, { Schema } from "mongoose";
import { IUser } from "./userTypes";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", UserSchema);

export { User, IUser };
