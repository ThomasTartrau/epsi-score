import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

// Get a single team by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const idNumber = parseInt(id);

    if (isNaN(idNumber)) {
      return NextResponse.json({ error: "Invalid team ID" }, { status: 400 });
    }

    const team = await prisma.team.findUnique({
      where: { id: idNumber },
      include: {
        scores: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 },
    );
  }
}

// Update team
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const idNumber = parseInt(id);

    if (isNaN(idNumber)) {
      return NextResponse.json({ error: "Invalid team ID" }, { status: 400 });
    }

    const { name } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Team name is required" },
        { status: 400 },
      );
    }

    // Check if the team exists
    const existingTeam = await prisma.team.findUnique({
      where: { id: idNumber },
    });

    if (!existingTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Check if another team already has this name
    const duplicateTeam = await prisma.team.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        id: {
          not: idNumber,
        },
      },
    });

    if (duplicateTeam) {
      return NextResponse.json(
        { error: "A team with this name already exists" },
        { status: 400 },
      );
    }

    // Update the team
    const updatedTeam = await prisma.team.update({
      where: { id: idNumber },
      data: { name },
    });

    return NextResponse.json({
      success: true,
      message: "Team updated successfully",
      team: updatedTeam,
    });
  } catch (error) {
    console.error("Error updating team:", error);
    return NextResponse.json(
      { error: "Failed to update team" },
      { status: 500 },
    );
  }
}

// Delete team
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const idNumber = parseInt(id);

    if (isNaN(idNumber)) {
      return NextResponse.json({ error: "Invalid team ID" }, { status: 400 });
    }

    // Check if the team exists
    const existingTeam = await prisma.team.findUnique({
      where: { id: idNumber },
      include: {
        _count: {
          select: { scores: true },
        },
      },
    });

    if (!existingTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Delete all scores associated with the team
    await prisma.score.deleteMany({
      where: { teamId: idNumber },
    });

    // Delete the team
    await prisma.team.delete({
      where: { id: idNumber },
    });

    return NextResponse.json({
      success: true,
      message: "Team and associated scores deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json(
      { error: "Failed to delete team" },
      { status: 500 },
    );
  }
}
