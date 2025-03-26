import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

// List all teams with optional pagination
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
    const search = searchParams.get("search") || undefined;

    // Get total count for pagination
    const totalCount = await prisma.team.count({
      where: {
        ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
      },
    });

    // Get teams with pagination and search
    const teams = await prisma.team.findMany({
      where: {
        ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
      },
      skip,
      take: limit,
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { scores: true },
        },
      },
    });

    return NextResponse.json({
      teams,
      pagination: {
        total: totalCount,
        page,
        pageSize: limit,
        pageCount: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 },
    );
  }
}

// Create a new team
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Team name is required" },
        { status: 400 },
      );
    }

    // Check if the team name already exists
    const existingTeam = await prisma.team.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (existingTeam) {
      return NextResponse.json(
        { error: "A team with this name already exists" },
        { status: 400 },
      );
    }

    // Create the new team
    const team = await prisma.team.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Team created successfully",
      team,
    });
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 },
    );
  }
}
