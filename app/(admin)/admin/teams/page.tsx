"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { TeamsTable } from "./_components/teams-table";
import { SearchForm } from "./_components/search-form";
import { PaginationControls } from "./_components/pagination-controls";
import { TeamModal } from "./_components/team-modal";
import { Team, PaginationData } from "./_types/team.types";
import { fetchTeams } from "./_actions/team.actions";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    limit: 10,
    offset: 0,
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadTeams = useCallback(async () => {
    setLoading(true);
    const result = await fetchTeams({
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
      setTeams(result.data.teams);
      setPagination({
        total: result.data.total,
        limit: result.data.limit,
        offset: result.data.offset,
      });
    }

    setLoading(false);
  }, [pagination.limit, pagination.offset, searchQuery]);

  useEffect(() => {
    loadTeams();
  }, [pagination.offset, pagination.limit, loadTeams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPagination({ ...pagination, offset: 0 });
    loadTeams();
  };

  const handlePageChange = (newOffset: number) => {
    setPagination({ ...pagination, offset: newOffset });
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestion des équipes</CardTitle>
            <CardDescription>
              Gérez les équipes participant à la compétition, créez, modifiez ou
              supprimez des équipes.
            </CardDescription>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="ml-auto"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Nouvelle équipe
          </Button>
        </CardHeader>
        <CardContent>
          <SearchForm
            initialQuery={searchQuery}
            onSearch={handleSearch}
            isLoading={loading}
          />

          <TeamsTable
            teams={teams}
            isLoading={loading}
            onActionComplete={loadTeams}
          />

          {!loading && teams.length > 0 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={pagination.limit}
            />
          )}
        </CardContent>
      </Card>

      <TeamModal
        team={null}
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onActionComplete={loadTeams}
      />
    </div>
  );
}
