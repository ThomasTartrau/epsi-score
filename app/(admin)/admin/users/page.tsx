"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { UsersTable } from "./_components/users-table";
import { SearchForm } from "./_components/search-form";
import { PaginationControls } from "./_components/pagination-controls";
import { User, PaginationData } from "./_types/user.types";
import { fetchUsers } from "./_actions/user.actions";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    limit: 10,
    offset: 0,
  });

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const result = await fetchUsers({
      limit: pagination.limit,
      offset: pagination.offset,
      searchValue: searchQuery,
    });

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    if (result.data) {
      setUsers(result.data.users);
      setPagination({
        total: result.data.total,
        limit: result.data.limit,
        offset: result.data.offset,
      });
    }

    setLoading(false);
  }, [pagination.limit, pagination.offset, searchQuery]);

  useEffect(() => {
    loadUsers();
  }, [pagination.offset, pagination.limit, loadUsers]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPagination({ ...pagination, offset: 0 });
    loadUsers();
  };

  const handlePageChange = (newOffset: number) => {
    setPagination({ ...pagination, offset: newOffset });
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des utilisateurs</CardTitle>
          <CardDescription>
            Gérez les utilisateurs de l&apos;application, bannissez ou
            débannissez les utilisateurs selon les besoins.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchForm
            initialQuery={searchQuery}
            onSearch={handleSearch}
            isLoading={loading}
          />

          <UsersTable
            users={users}
            isLoading={loading}
            onActionComplete={loadUsers}
          />

          {!loading && users.length > 0 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={pagination.limit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
