import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// List all scores with filtering options
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page") as string)
      : 1;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit") as string)
      : 10;
    const skip = (page - 1) * limit;
    const userId = searchParams.get("userId") || undefined;
    const teamId = searchParams.get("teamId")
      ? parseInt(searchParams.get("teamId") as string)
      : undefined;

    // Build filter
    const where: Prisma.ScoreWhereInput = {};
    if (userId) {
      where.userId = userId;
    }
    if (teamId && !isNaN(teamId)) {
      where.teamId = teamId;
    }

    // Get total count for pagination
    const totalCount = await prisma.score.count({ where });

    // Get scores with pagination and filters
    const scores = await prisma.score.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        team: true,
      },
    });

    return NextResponse.json({
      scores,
      pagination: {
        total: totalCount,
        page,
        pageSize: limit,
        pageCount: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching scores:", error);
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 },
    );
  }
}

// Delete scores (bulk delete)
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { scoreIds } = await req.json();

    if (!scoreIds || !Array.isArray(scoreIds) || scoreIds.length === 0) {
      return NextResponse.json(
        { error: "Score IDs are required for deletion" },
        { status: 400 },
      );
    }

    // Convert string IDs to numbers
    const parsedIds = scoreIds
      .map((id) => {
        const parsedId = parseInt(id);
        return isNaN(parsedId) ? null : parsedId;
      })
      .filter((id) => id !== null) as number[];

    if (parsedIds.length === 0) {
      return NextResponse.json(
        { error: "No valid score IDs provided" },
        { status: 400 },
      );
    }

    // Delete the scores
    const result = await prisma.score.deleteMany({
      where: {
        id: {
          in: parsedIds,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `${result.count} scores deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting scores:", error);
    return NextResponse.json(
      { error: "Failed to delete scores" },
      { status: 500 },
    );
  }
}
