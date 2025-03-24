"use server";

import { ScoresResultInterface } from "@/app/_types/scores.type";

export async function getScores(): Promise<ScoresResultInterface> {
  try {
    const timestamp = Date.now();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/scores?t=${timestamp}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch scores:", error);
    return { scores: [] };
  }
}
