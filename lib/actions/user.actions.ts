"use server";

import User, { IUser } from "../database/models/user.models";
import { connectToDatabase } from "../database/mongoose";

// GET USER
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
}

// CREATE USER
export async function createUser(user: Partial<IUser>) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error(error);
  }
}

// UPDATE USER
export async function updateUser(userId: string, user: Partial<IUser>) {
  try {
    await connectToDatabase();

    const updateUser = await User.findOneAndUpdate(
      { clerkId: userId },
      user,
      { new: true }
    );

    if (!updateUser) throw new Error("User update fails");

    return JSON.parse(JSON.stringify(updateUser));
  } catch (error) {
    console.error(error);
  }
}

// DELETE USER
export async function deleteUser(userId: string) {
  try {
    await connectToDatabase();

    const deleteUser = await User.findById({ clerkId: userId });

    if (!deleteUser) throw new Error("User doesn't exist");

    const deletedUser = await User.findByIdAndDelete();

    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    console.error(error);
  }
}
