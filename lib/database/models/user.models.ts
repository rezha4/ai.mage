import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  clerkId: string;
  planId: string;
  photo: string;
  creditBalance: number;
}

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  clerkId: { type: String, required: true, unique: true },
  planId: { type: Number, default: 1 },
  photo: { type: String, required: true },
  creditBalance: { type: Number, default: 10 },
  email: { type: String, required: true, unique: true },
});

const User = models?.User || model("User", UserSchema);

export default User;
