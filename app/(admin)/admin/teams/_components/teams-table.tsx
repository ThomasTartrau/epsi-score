"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash2Icon, RefreshCw } from "lucide-react";
import { Team } from "../_types/team.types";
import { TeamModal } from "./team-modal";
import { DeleteTeamModal } from "./delete-team-modal";

interface TeamsTableProps {
  teams: Team[];
  isLoading: boolean;
  onActionComplete: () => void;
}

export function TeamsTable({
  teams,
  isLoading,
  onActionComplete,
}: TeamsTableProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = (team: Team) => {
    setSelectedTeam(team);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (team: Team) => {
    setSelectedTeam(team);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="mt-6 mb-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center">
                  <RefreshCw className="mr-2 inline-block h-5 w-5 animate-spin" />
                  Chargement...
                </TableCell>
              </TableRow>
            ) : teams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center">
                  Aucune équipe trouvée
                </TableCell>
              </TableRow>
            ) : (
              teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.id}</TableCell>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>
                    {new Date(team.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(team)}
                    >
                      <EditIcon className="mr-2 h-4 w-4" />
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(team)}
                    >
                      <Trash2Icon className="mr-2 h-4 w-4" />
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TeamModal
        team={selectedTeam}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onActionComplete={onActionComplete}
      />

      <DeleteTeamModal
        team={selectedTeam}
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onActionComplete={onActionComplete}
      />
    </>
  );
}
