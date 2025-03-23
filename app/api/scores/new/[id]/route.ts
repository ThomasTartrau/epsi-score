import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import prisma from "@/lib/prisma";
import { newScoreSchema } from "@/app/(authenticated)/dashboard/scores/new/[id]/_types/score.types";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour accéder à cette page." },
        { status: 401 },
      );
    }

    const id = (await params).id;

    if (isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "L'id de l'équipe est invalide." },
        { status: 400 },
      );
    }

    const teamIdNumber = parseInt(id);

    const team = await prisma.team.findUnique({
      where: {
        id: teamIdNumber,
      },
    });

    if (!team) {
      return NextResponse.json(
        {
          error:
            "L'équipe n'existe pas. Si le problème persiste, veuillez contacter l'administrateur.",
        },
        { status: 404 },
      );
    }

    const existingScore = await prisma.score.findUnique({
      where: {
        userId_teamId: {
          userId: session.user.id,
          teamId: teamIdNumber,
        },
      },
    });

    if (existingScore) {
      return NextResponse.json(
        {
          error:
            "Vous avez déjà voté pour cette équipe. Vous ne pouvez pas voter plus d'une fois par équipe.",
        },
        { status: 400 },
      );
    }

    const data = await request.json();

    // Valider le corps de la requête
    const validatedData = newScoreSchema.parse({
      ...data,
      id: teamIdNumber,
    });

    await prisma.score.create({
      data: {
        ...validatedData,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        team: {
          connect: {
            id: teamIdNumber,
          },
        },
      },
    });

    return NextResponse.json({
      success: "Merci! Votre vote a bien été pris en compte.",
    });
  } catch (error) {
    console.error("Erreur dans POST /api/scores/new/[id]:", error);
    return NextResponse.json(
      { error: "Erreur Interne du Serveur" },
      { status: 500 },
    );
  }
}
