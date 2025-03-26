"use client";

import { useState } from "react";
import { User } from "../_types/user.types";
import { banUser, unbanUser } from "../_actions/user.actions";
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

interface BanUserModalProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActionComplete: () => void;
}

export function BanUserModal({
  user,
  open,
  onOpenChange,
  onActionComplete,
}: BanUserModalProps) {
  const [isPending, setIsPending] = useState(false);
  const [banReason, setBanReason] = useState("");

  const resetState = () => {
    setBanReason("");
    setIsPending(false);
  };

  const handleAction = async () => {
    if (!user) return;

    setIsPending(true);

    if (user.banned) {
      await unbanUser(user.id);
    } else {
      await banUser(user.id, banReason);
    }

    onOpenChange(false);
    onActionComplete();
    resetState();
  };

  const handleClose = () => {
    resetState();
    onOpenChange(false);
  };

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalHeader>
        <ResponsiveModalTitle>
          {user?.banned ? "Débannir l'utilisateur" : "Bannir l'utilisateur"}
        </ResponsiveModalTitle>
        <ResponsiveModalDescription>
          {user?.banned
            ? "Êtes-vous sûr de vouloir débannir cet utilisateur ? Il pourra à nouveau se connecter à l'application."
            : "Êtes-vous sûr de vouloir bannir cet utilisateur ? Il ne pourra plus se connecter à l'application."}
        </ResponsiveModalDescription>
      </ResponsiveModalHeader>
      <Separator className="my-4" />

      {!user?.banned && (
        <div className="space-y-4 px-4 md:px-0">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Raison du bannissement
            </label>
            <Input
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="Raison du bannissement"
              className="mt-2"
            />
          </div>
        </div>
      )}

      <ResponsiveModalFooter className="mt-6 space-x-2">
        <Button variant="outline" onClick={handleClose}>
          Annuler
        </Button>
        <LoadingButton
          variant={user?.banned ? "default" : "destructive"}
          onClick={handleAction}
          loading={isPending}
        >
          {user?.banned ? "Débannir" : "Bannir"}
        </LoadingButton>
      </ResponsiveModalFooter>
    </ResponsiveModal>
  );
}
