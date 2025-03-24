import { NextResponse } from "next/server";
import { ScoresResultInterface } from "@/app/_types/scores.type"; // Importer l'interface
import prisma from "@/lib/prisma"; // Importer le client Prisma

export async function GET() {
  // Récupérer les scores des équipes depuis la base de données
  const teams = await prisma.team.findMany({
    include: {
      scores: true, // Inclure les scores associés à chaque équipe
    },
  });

  // Calculer la moyenne des scores pour chaque équipe
  const results: ScoresResultInterface = {
    scores: teams
      .map((team) => {
        const totalScore = team.scores.reduce((acc, score) => {
          return (
            acc +
            score.score_1 +
            score.score_2 +
            score.score_3 +
            score.score_4 +
            score.score_5
          );
        }, 0);
        const averageScore =
          team.scores.length > 0
            ? totalScore / (team.scores.length * 5) // Diviser par le nombre total de scores
            : 0; // Si aucune score, assigner 0

        return {
          teamName: team.name,
          score: averageScore,
        };
      })
      .sort((a, b) => {
        if (b.score === a.score) {
          return 0; // Conserver l'ordre d'origine en cas d'égalité
        }
        return b.score - a.score; // Trier par score décroissant
      }),
  };

  // Créer une réponse avec des en-têtes anti-cache pour garantir des données fraîches
  const response = NextResponse.json(results);

  // Ajouter des en-têtes pour empêcher la mise en cache
  response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
