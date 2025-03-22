"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VerifyState } from "../_types/two-factor.types";
import { verifyTotp } from "../_actions/two-factor-verify.actions";
import { useRouter } from "next/navigation";

const initialState: VerifyState = {
  code: "",
  error: "",
  isLoading: false,
};

export function TwoFactorVerify() {
  const [state, setState] = useState<VerifyState>(initialState);

  const router = useRouter();

  const updateState = (updates: Partial<VerifyState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    updateState({ code });
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
            onClick={() => verifyTotp(state.code, updateState, router)}
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
