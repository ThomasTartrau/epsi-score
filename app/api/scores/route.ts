import { NextResponse } from "next/server";
import { ScoresResultInterface } from "@/app/_types/scores.type";
import prisma from "@/lib/prisma";

export async function GET() {
  const teams = await prisma.team.findMany({
    include: {
      scores: true,
    },
  });

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
          team.scores.length > 0 ? totalScore / (team.scores.length * 5) : 0;

        return {
          teamName: team.name,
          score: averageScore,
        };
      })
      .sort((a, b) => {
        if (b.score === a.score) {
          return 0;
        }
        return b.score - a.score;
      }),
  };

  const response = NextResponse.json(results);
  response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
