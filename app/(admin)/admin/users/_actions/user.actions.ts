import { authClient } from "@/lib/auth/client";
import { User } from "../_types/user.types";
import { toast } from "sonner";
import { ErrorContext } from "@better-fetch/fetch";

interface FetchUsersParams {
  limit: number;
  offset: number;
  searchValue?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  filterField?: string;
  filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte";
  filterValue?: string;
}

interface FetchUsersResult {
  error?: string;
  data?: {
    users: User[];
    total: number;
    limit: number;
    offset: number;
  };
}

export async function fetchUsers(
  params: FetchUsersParams,
): Promise<FetchUsersResult> {
  try {
    const response = await authClient.admin.listUsers({
      query: {
        limit: params.limit,
        offset: params.offset,
        ...(params.searchValue
          ? {
              searchField: "email",
              searchOperator: "contains",
              searchValue: params.searchValue,
            }
          : {}),
        ...(params.sortBy
          ? {
              sortBy: params.sortBy,
              sortDirection: params.sortDirection || "asc",
            }
          : {}),
        ...(params.filterField
          ? {
              filterField: params.filterField,
              filterOperator: params.filterOperator,
              filterValue: params.filterValue,
            }
          : {}),
      },
    });

    const data = response.data;

    if (!data) {
      throw new Error("No data returned from authClient.admin.listUsers");
    }

    return {
      data: {
        users: data.users as User[],
        total: data.total,
        limit: params.limit,
        offset: params.offset,
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      error: "Failed to load users",
    };
  }
}

export async function banUser(userId: string, banReason?: string) {
  await authClient.admin.banUser(
    {
      userId,
      banReason: banReason || undefined,
    },
    {
      onSuccess: () => {
        toast.success("L'utilisateur a été banni avec succès");
      },
      onError: (error: ErrorContext) => {
        toast.error(error.error.message);
      },
    },
  );
}

export async function unbanUser(userId: string) {
  await authClient.admin.unbanUser(
    {
      userId,
    },
    {
      onSuccess: () => {
        toast.success("L'utilisateur a été débanni avec succès");
      },
      onError: (error: ErrorContext) => {
        toast.error(error.error.message);
      },
    },
  );
}
