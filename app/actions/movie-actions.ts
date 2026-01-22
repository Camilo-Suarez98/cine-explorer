"use server";

import { searchMovieByUserDescription } from "@/lib/openai/client";

export async function getMovieTitleFromDescription(description: string) {
  if (!description) return null;

  try {
    const title = await searchMovieByUserDescription(description);
    return title;
  } catch (error) {
    console.error("Error searching movie by description:", error);
    return null;
  }
};
