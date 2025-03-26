"use client";

import { useEffect } from "react";
import party from "party-js";
import Logo from "@/components/custom/logo";

export default function ConfirmationClient() {
  useEffect(() => {
    party.confetti(party.Rect.fromScreen(), {
      count: 180,
      spread: 80,
      size: party.variation.range(1.2, 1.6),
    });
  }, []);
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex items-center justify-center rounded-md">
        <Logo />
      </div>
      <h1 className="text-2xl font-bold">
        Votre note a été enregistrée avec succès.
      </h1>
      <p className="text-muted-foreground">Merci de votre participation !</p>
    </div>
  );
}
