"use server";
import { revalidatePath } from "next/cache";
import { CreateEventParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";

// CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    // revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}
