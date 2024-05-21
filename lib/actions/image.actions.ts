"use server";

import Image from "../database/models/image.model";
import User from "../database/models/user.models";
import { connectToDatabase } from "../database/mongoose";
import { revalidatePath } from "next/cache";

export async function saveImage(
  image: any,
  userId: any,
  path: string
) {
  try {
    await connectToDatabase();

    const author = await User.findOne({ clerkId: userId });

    if (!author) {
      throw new Error("User not found");
    }

    const newImage = await Image.create({
      ...image,
      author: author._id,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    console.error(error);
  }
}
