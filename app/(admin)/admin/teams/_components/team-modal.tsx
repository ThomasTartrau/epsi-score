"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Team } from "../_types/team.types";
import { createTeam, updateTeam } from "../_actions/team.actions";
import {
  ResponsiveModal,
  ResponsiveModalHeader,
  ResponsiveModalFooter,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
} from "@/components/custom/responsive-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoadingButton } from "@/components/custom/loading-button";

interface TeamModalProps {
  team: Team | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActionComplete: () => void;
}

export function TeamModal({
  team,
  open,
  onOpenChange,
  onActionComplete,
}: TeamModalProps) {
  const [name, setName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const isEditing = !!team;

  useEffect(() => {
    if (team) {
      setName(team.name);
    } else {
      setName("");
    }
  }, [team, open]);

  const resetState = () => {
    setName("");
    setIsPending(false);
  };

  const handleAction = async () => {
    if (!name.trim()) {
      toast.error("Le nom de l'équipe est obligatoire");
      return;
    }

    setIsPending(true);

    try {
      let result;

      if (isEditing && team) {
        result = await updateTeam({
          id: team.id,
          name: name.trim(),
        });
      } else {
        result = await createTeam({
          name: name.trim(),
        });
      }

      if (result.success) {
        toast.success(
          isEditing
            ? "Équipe mise à jour avec succès"
            : "Équipe créée avec succès",
        );
        onOpenChange(false);
        onActionComplete();
        resetState();
      } else {
        toast.error(result.error || "Une erreur s'est produite");
        setIsPending(false);
      }
    } catch (error) {
      console.error("Error handling team:", error);
      toast.error("Une erreur inattendue s'est produite");
      setIsPending(false);
    }
  };

  const handleClose = () => {
    resetState();
    onOpenChange(false);
  };

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalHeader>
        <ResponsiveModalTitle>
          {isEditing ? "Modifier l'équipe" : "Créer une nouvelle équipe"}
        </ResponsiveModalTitle>
        <ResponsiveModalDescription>
          {isEditing
            ? "Modifiez les informations de l'équipe ci-dessous."
            : "Remplissez les informations pour créer une nouvelle équipe."}
        </ResponsiveModalDescription>
      </ResponsiveModalHeader>
      <Separator className="my-1" />

      <div className="space-y-2 px-4 md:px-0">
        <label className="text-sm font-medium">Nom</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom de l'équipe"
          className="mt-2"
        />
      </div>

      <ResponsiveModalFooter className="mt-6 space-x-2">
        <Button variant="outline" onClick={handleClose}>
          Annuler
        </Button>
        <LoadingButton onClick={handleAction} loading={isPending}>
          {isEditing ? "Mettre à jour" : "Créer"}
        </LoadingButton>
      </ResponsiveModalFooter>
    </ResponsiveModal>
  );
}
