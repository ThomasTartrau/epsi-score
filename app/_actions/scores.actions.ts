"use server";

import { ScoresResultInterface } from "@/app/_types/scores.type";

export async function getScores(): Promise<ScoresResultInterface> {
  try {
    // Ajout d'un timestamp pour éviter toute mise en cache par le navigateur
    const timestamp = Date.now();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/scores?t=${timestamp}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
        next: {
          revalidate: 0, // Ne pas revalider automatiquement, nous gérons cela manuellement
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch scores:", error);
    // Return empty scores array as fallback
    return { scores: [] };
  }
}
