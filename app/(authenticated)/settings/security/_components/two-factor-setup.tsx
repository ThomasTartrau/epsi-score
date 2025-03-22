"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { useSession } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  disableTwoFactor,
  enableTwoFactor,
  MAX_VERIFICATION_ATTEMPTS,
  SetupState,
  updateSetupState,
  vertifyOneTimePassword,
} from "../_actions/security.actions";

const initialSetupState: SetupState = {
  step: "initial",
  totpUri: "",
  backupCodes: [],
  verificationCode: "",
  verificationAttempts: 0,
  error: "",
  isLoading: false,
  password: "",
};

export function TwoFactorSetup() {
  const { data: session } = useSession();
  const [setupState, setSetupState] = useState<SetupState>(initialSetupState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false);

  const is2FAEnabled = session?.user.twoFactorEnabled || false;

  const resetSetupState = () => {
    setSetupState(initialSetupState);
  };

  const enable2FA = async () => {
    await enableTwoFactor(setupState, setSetupState, setIsDialogOpen);
  };

  const disable2FA = async () => {
    await disableTwoFactor(
      setupState,
      setSetupState,
      setIsDisableDialogOpen,
      resetSetupState,
    );
  };

  const verifyTotp = async () => {
    await vertifyOneTimePassword(setupState, setSetupState, resetSetupState);
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const code = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    updateSetupState({ verificationCode: code }, setSetupState);
  };

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            updateSetupState({ password: "" }, setSetupState);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activation du 2FA</DialogTitle>
            <DialogDescription>
              Veuillez entrer votre mot de passe pour activer le 2FA.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={setupState.password}
                onChange={(e) =>
                  updateSetupState({ password: e.target.value }, setSetupState)
                }
                placeholder="Entrez votre mot de passe"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={setupState.isLoading}
            >
              Annuler
            </Button>
            <Button
              onClick={enable2FA}
              disabled={!setupState.password || setupState.isLoading}
            >
              {setupState.isLoading ? "Activation..." : "Activer le 2FA"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDisableDialogOpen}
        onOpenChange={(open) => {
          setIsDisableDialogOpen(open);
          if (!open) {
            updateSetupState({ password: "" }, setSetupState);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Désactivation du 2FA</DialogTitle>
            <DialogDescription>
              Veuillez entrer votre mot de passe pour désactiver le 2FA. Cela
              rendra votre compte moins sécurisé.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="disable-password">Mot de passe</Label>
              <Input
                id="disable-password"
                type="password"
                value={setupState.password}
                onChange={(e) =>
                  updateSetupState({ password: e.target.value }, setSetupState)
                }
                placeholder="Entrez votre mot de passe"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDisableDialogOpen(false)}
              disabled={setupState.isLoading}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={disable2FA}
              disabled={!setupState.password || setupState.isLoading}
            >
              {setupState.isLoading ? "Désactivation..." : "Désactiver le 2FA"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">
              Authentification à deux facteurs
            </h3>
            <p className="text-muted-foreground text-sm">
              Ajoutez une couche de sécurité supplémentaire à votre compte en
              activant le 2FA
            </p>
            <Separator className="mt-2" />
          </div>
          {is2FAEnabled && (
            <div className="flex items-center gap-4">
              <Badge variant="outline">Activé</Badge>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsDisableDialogOpen(true)}
              >
                Désactiver le 2FA
              </Button>
            </div>
          )}
        </div>

        {!is2FAEnabled && (
          <div className="space-y-4">
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Utilisez une application d&apos;authentification comme Google
                Authenticator ou Authy pour obtenir les codes de vérification du
                2FA.
              </p>
              {setupState.step === "initial" && (
                <Button onClick={() => setIsDialogOpen(true)}>
                  Activer le 2FA
                </Button>
              )}

              {setupState.step === "qr" && (
                <div className="space-y-6">
                  <div className="bg-card rounded-lg border p-6">
                    <h4 className="mb-4 text-sm font-medium">
                      Étape 1 : Ajoutez à votre application
                      d&apos;authentification
                    </h4>
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-center rounded-lg bg-white p-4">
                          <QRCode value={setupState.totpUri} size={200} />
                        </div>
                        <p className="text-muted-foreground text-center text-sm">
                          Scannez ce QR code avec votre application
                          d&apos;authentification
                        </p>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <p className="text-muted-foreground text-sm">
                            Ou entrez manuellement ce code dans votre
                            application d&apos;authentification :
                          </p>
                          <div className="relative">
                            <Input
                              type="text"
                              value={
                                setupState.totpUri
                                  .split("secret=")[1]
                                  ?.split("&")[0] || ""
                              }
                              readOnly
                              className="pr-20 font-mono text-sm"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute top-1 right-1 h-7"
                              onClick={() => {
                                const secret = setupState.totpUri
                                  .split("secret=")[1]
                                  ?.split("&")[0];
                                if (secret) {
                                  navigator.clipboard.writeText(secret);
                                  toast.success(
                                    "Code copié dans le presse-papiers",
                                  );
                                }
                              }}
                            >
                              Copier
                            </Button>
                          </div>
                          <p className="text-muted-foreground text-xs">
                            Utilisez ce code si vous ne pouvez pas scanner le QR
                            code
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg border p-6">
                    <h4 className="mb-4 text-sm font-medium">
                      Étape 2 : Vérifier la configuration
                    </h4>
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Entrez le code à 6 chiffres de votre application
                        d&apos;authentification pour vérifier la configuration
                      </p>
                      <div className="space-y-2">
                        <Input
                          type="text"
                          placeholder="Entrez le code à 6 chiffres de vérification"
                          value={setupState.verificationCode}
                          onChange={handleVerificationCodeChange}
                          maxLength={6}
                          pattern="[0-9]*"
                          inputMode="numeric"
                          className="text-lg"
                        />
                        <p className="text-muted-foreground text-xs">
                          Tentatives restantes :{" "}
                          {MAX_VERIFICATION_ATTEMPTS -
                            setupState.verificationAttempts}
                        </p>
                      </div>
                      <Button
                        onClick={verifyTotp}
                        className="w-full"
                        disabled={
                          setupState.isLoading ||
                          setupState.verificationCode.length !== 6 ||
                          setupState.verificationAttempts >=
                            MAX_VERIFICATION_ATTEMPTS
                        }
                      >
                        {setupState.isLoading ? "Vérification..." : "Vérifier"}
                      </Button>
                    </div>
                  </div>

                  {setupState.backupCodes.length > 0 && (
                    <div className="bg-card rounded-lg border p-6">
                      <Alert>
                        <AlertTitle>Codes de secours</AlertTitle>
                        <AlertDescription>
                          <p className="text-muted-foreground mb-2 text-sm">
                            Enregistrez ces codes de secours dans un endroit
                            sûr. Vous pouvez les utiliser pour accéder à votre
                            compte si vous perdez votre appareil
                            d&apos;authentification.
                          </p>
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            {setupState.backupCodes.map((code) => (
                              <code
                                key={code}
                                className="bg-muted block rounded p-2 font-mono text-sm"
                              >
                                {code}
                              </code>
                            ))}
                          </div>
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {setupState.error && (
          <Alert variant="destructive">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{setupState.error}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
