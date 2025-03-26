"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Team } from "../_types/team.types";
import { deleteTeam } from "../_actions/team.actions";
import {
  ResponsiveModal,
  ResponsiveModalHeader,
  ResponsiveModalFooter,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
} from "@/components/custom/responsive-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2Icon } from "lucide-react";
import { LoadingButton } from "@/components/custom/loading-button";

interface DeleteTeamModalProps {
  team: Team | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActionComplete: () => void;
}

export function DeleteTeamModal({
  team,
  open,
  onOpenChange,
  onActionComplete,
}: DeleteTeamModalProps) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    if (!team) return;

    setIsPending(true);

    try {
      const result = await deleteTeam(team.id);

      if (result.success) {
        toast.success("Équipe supprimée avec succès");
        onOpenChange(false);
        onActionComplete();
      } else {
        toast.error(result.error || "Échec de la suppression de l'équipe");
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      toast.error("Une erreur inattendue s'est produite");
    } finally {
      setIsPending(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalHeader>
        <ResponsiveModalTitle>Supprimer l&apos;équipe</ResponsiveModalTitle>
        <ResponsiveModalDescription>
          Êtes-vous sûr de vouloir supprimer l&apos;équipe &quot;{team?.name}
          &quot; ? Cette action est irréversible et supprimera également tous
          les scores associés à cette équipe.
        </ResponsiveModalDescription>
      </ResponsiveModalHeader>
      <Separator className="my-4" />

      <ResponsiveModalFooter className="mt-6 space-x-2">
        <Button variant="outline" onClick={handleClose}>
          Annuler
        </Button>
        <LoadingButton
          variant="destructive"
          onClick={handleDelete}
          loading={isPending}
        >
          <Trash2Icon className="mr-2 h-4 w-4" />
          Supprimer
        </LoadingButton>
      </ResponsiveModalFooter>
    </ResponsiveModal>
  );
}
