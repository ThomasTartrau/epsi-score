"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Session } from "@/lib/auth/types";
import {
  ResponsiveModal,
  ResponsiveModalHeader,
  ResponsiveModalFooter,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
} from "@/components/custom/responsive-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/custom/loading-button";
import { deleteUserAction } from "../_actions/security.actions";

interface UserDeleteFormProps {
  session: Session | null;
}
export function UserDeleteForm({ session }: UserDeleteFormProps) {
  const [isPending, startTransition] = useTransition();
  const [confirmation, setConfirmation] = useState("");
  const router = useRouter();

  function onSubmit() {
    startTransition(async () => {
      await deleteUserAction(confirmation, session as Session, router);
    });
  }

  return (
    <ResponsiveModal
      trigger={<Button variant="destructive">Supprimer le compte</Button>}
    >
      <ResponsiveModalHeader>
        <ResponsiveModalTitle>
          Confirmer la suppression du compte
        </ResponsiveModalTitle>
        <ResponsiveModalDescription>
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
          irréversible et toutes vos données seront définitivement supprimées.
        </ResponsiveModalDescription>
      </ResponsiveModalHeader>
      <div className="mt-2 space-y-4 px-4 md:px-0">
        <div className="space-y-2">
          <Label htmlFor="confirmation" className="text-sm font-medium">
            Pour confirmer, tapez votre nom :{" "}
            <span className="text-foreground font-semibold">
              {session?.user.name}
            </span>
          </Label>
          <Input
            id="confirmation"
            type="text"
            placeholder={session?.user.name}
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <ResponsiveModalFooter className="mt-6">
        <LoadingButton
          className="bg-destructive hover:bg-destructive/90 w-full"
          onClick={onSubmit}
          disabled={isPending || confirmation !== session?.user?.name}
          loading={isPending}
        >
          Je comprends les conséquences, supprimer mon compte
        </LoadingButton>
      </ResponsiveModalFooter>
    </ResponsiveModal>
  );
}
