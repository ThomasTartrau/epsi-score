"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { twoFactor } from "@/lib/auth/client";
import type { ErrorContext } from "better-auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

interface VerifyState {
  code: string;
  error: string;
  isLoading: boolean;
}

const initialState: VerifyState = {
  code: "",
  error: "",
  isLoading: false,
};

export function TwoFactorVerify() {
  const router = useRouter();
  const [state, setState] = useState<VerifyState>(initialState);

  const updateState = (updates: Partial<VerifyState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    updateState({ code });
  };

  const verifyTotp = async () => {
    try {
      await twoFactor.verifyTotp(
        {
          code: state.code,
          trustDevice: true, // Faire confiance à cet appareil pendant 60 jours
        },
        {
          onRequest: () => {
            updateState({ isLoading: true, error: "" });
            toast.loading("Vérification du code...", { id: "verifyTotpToast" });
          },
          onSuccess: async () => {
            toast.success("Vérification réussie", { id: "verifyTotpToast" });
            router.push("/dashboard");
          },
          onError: async (context: ErrorContext) => {
            updateState({
              error: context.error.message ?? "Code de vérification invalide",
              isLoading: false,
              code: "",
            });
            toast.error(
              context.error.message ?? "Code de vérification invalide",
              {
                id: "verifyTotpToast",
              },
            );
            console.error("Erreur de vérification 2FA :", context);
          },
        },
      );
    } catch (error) {
      console.error("Erreur inattendue lors de la vérification :", error);
    }
  };

  return (
    <Card className="mx-auto mt-3 w-full max-w-md">
      <CardHeader>
        <CardTitle>Authentification à deux facteurs</CardTitle>
        <CardDescription>
          Entrez le code à 6 chiffres de votre application
          d&apos;authentification pour continuer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Entrez le code à 6 chiffres"
              value={state.code}
              onChange={handleCodeChange}
              maxLength={6}
              pattern="[0-9]*"
              inputMode="numeric"
              className="text-lg"
              disabled={state.isLoading}
            />
          </div>
          <Button
            onClick={verifyTotp}
            className="w-full"
            disabled={state.isLoading || state.code.length !== 6}
          >
            {state.isLoading ? "Vérification..." : "Vérifier"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
