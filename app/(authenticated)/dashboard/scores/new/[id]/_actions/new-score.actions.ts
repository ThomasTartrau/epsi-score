import { newScoreSchema } from "../_types/score.types";
import { z } from "zod";

export async function newScore(
  values: z.infer<typeof newScoreSchema>,
  teamId: string,
) {
  try {
    const response = await fetch(`/api/scores/new/${teamId}`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return { success: data.success };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { error: error.message };
    }

    return {
      error:
        "Une erreur est survenue lors de l'attribution de la note. Merci de réessayer.",
    };
  }
}
