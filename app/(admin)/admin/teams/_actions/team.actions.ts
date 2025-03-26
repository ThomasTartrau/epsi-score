import { Team } from "../_types/team.types";

interface FetchTeamsParams {
  limit: number;
  offset: number;
  searchValue?: string;
}

interface FetchTeamsResult {
  error?: string;
  data?: {
    teams: Team[];
    total: number;
    limit: number;
    offset: number;
  };
}

export async function fetchTeams(
  params: FetchTeamsParams,
): Promise<FetchTeamsResult> {
  try {
    const queryParams = new URLSearchParams({
      limit: params.limit.toString(),
      offset: params.offset.toString(),
    });

    if (params.searchValue) {
      queryParams.append("search", params.searchValue);
    }

    const response = await fetch(`/api/admin/teams?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error fetching teams: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      data: {
        teams: data.teams as Team[],
        total: data.pagination?.total || 0,
        limit: params.limit,
        offset: params.offset,
      },
    };
  } catch (error) {
    console.error("Error fetching teams:", error);
    return {
      error: "Failed to load teams",
    };
  }
}

interface CreateTeamParams {
  name: string;
}

export async function createTeam(
  params: CreateTeamParams,
): Promise<{ success: boolean; error?: string; team?: Team }> {
  try {
    const response = await fetch("/api/admin/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: params.name,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create team");
    }

    const data = await response.json();

    return {
      success: true,
      team: data.team,
    };
  } catch (error) {
    console.error("Error creating team:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create team",
    };
  }
}

interface UpdateTeamParams {
  id: string;
  name: string;
}

export async function updateTeam(
  params: UpdateTeamParams,
): Promise<{ success: boolean; error?: string; team?: Team }> {
  try {
    const response = await fetch(`/api/admin/teams/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: params.name,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update team");
    }

    const data = await response.json();

    return {
      success: true,
      team: data.team,
    };
  } catch (error) {
    console.error("Error updating team:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update team",
    };
  }
}

export async function deleteTeam(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/admin/teams/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete team");
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting team:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete team",
    };
  }
}
