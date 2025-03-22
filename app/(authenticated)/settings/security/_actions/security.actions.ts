import { toast } from "sonner";
import { changePassword, deleteUser, twoFactor } from "@/lib/auth/client";
import { RouterType } from "@/app/_types/auth.types";
import { Session } from "@/lib/auth/types";
import { ErrorContext } from "better-auth/react";
import { SetStateAction } from "react";
import { updatePasswordSchema } from "../../_types/settings.types";
import { z } from "zod";

export const MAX_VERIFICATION_ATTEMPTS = 3;

type SetupStep = "initial" | "qr" | "verify";

export interface SetupState {
  step: SetupStep;
  totpUri: string;
  backupCodes: string[];
  verificationCode: string;
  verificationAttempts: number;
  error: string;
  isLoading: boolean;
  password: string;
}

export async function deleteUserAction(
  confirmation: string,
  session: Session,
  router: RouterType,
) {
  toast.loading("Suppression du compte...", { id: "deleteAccountToast" });
  if (confirmation !== session?.user?.name) {
    toast.error("Veuillez taper votre nom pour confirmer", {
      id: "deleteAccountToast",
    });
    return;
  }
  await deleteUser()
    .then(async () => {
      toast.success("Compte supprimé avec succès", {
        id: "deleteAccountToast",
      });
      router.refresh();
    })
    .catch((err) => {
      toast.error(err.message ?? "Quelque chose s'est mal passé.", {
        id: "deleteAccountToast",
      });
    });
}

export const updateSetupState = (
  updates: Partial<SetupState>,
  setSetupState: (state: SetStateAction<SetupState>) => void,
) => {
  setSetupState((prev) => ({ ...prev, ...updates }));
};

export async function enableTwoFactor(
  setupState: SetupState,
  setSetupState: (state: SetStateAction<SetupState>) => void,
  setIsDialogOpen: (open: boolean) => void,
) {
  try {
    await twoFactor.enable(
      {
        password: setupState.password,
      },
      {
        onRequest: () => {
          updateSetupState({ isLoading: true, error: "" }, setSetupState);
          toast.loading("Activation du 2FA...", { id: "enable2FAToast" });
        },
        onSuccess: async ({
          data,
        }: {
          data: { totpURI: string; backupCodes: string[] };
        }) => {
          if (data) {
            updateSetupState(
              {
                totpUri: data.totpURI,
                backupCodes: data.backupCodes,
                step: "qr",
                password: "",
                isLoading: false,
              },
              setSetupState,
            );
          }
          setIsDialogOpen(false);
          toast.success(
            "Scannez le QR code avec votre application d'authentification",
            {
              id: "enable2FAToast",
            },
          );
        },
        onError: async (context: ErrorContext) => {
          updateSetupState(
            {
              error: context.error.message ?? "Échec de l'activation du 2FA",
              isLoading: false,
            },
            setSetupState,
          );
          toast.error(context.error.message ?? "Échec de l'activation du 2FA", {
            id: "enable2FAToast",
          });
          console.error("Erreur lors de l'activation du 2FA :", context);
        },
      },
    );
  } catch (error) {
    console.error("Erreur inattendue lors de l'activation du 2FA :", error);
  }
}

export async function disableTwoFactor(
  setupState: SetupState,
  setSetupState: (state: SetStateAction<SetupState>) => void,
  setIsDisableDialogOpen: (open: boolean) => void,
  resetSetupState: () => void,
) {
  try {
    await twoFactor.disable(
      {
        password: setupState.password,
      },
      {
        onRequest: () => {
          updateSetupState({ isLoading: true, error: "" }, setSetupState);
          toast.loading("Désactivation du 2FA...", {
            id: "disable2FAToast",
          });
        },
        onSuccess: async () => {
          resetSetupState();
          setIsDisableDialogOpen(false);
          toast.success("2FA désactivé avec succès", {
            id: "disable2FAToast",
          });
        },
        onError: async (context: ErrorContext) => {
          updateSetupState(
            {
              error:
                context.error.message ?? "Échec de la désactivation du 2FA",
              isLoading: false,
              password: "",
            },
            setSetupState,
          );
          toast.error(
            context.error.message ?? "Échec de la désactivation du 2FA",
            {
              id: "disable2FAToast",
            },
          );
          console.error("Erreur lors de la désactivation du 2FA :", context);
        },
      },
    );
  } catch (error) {
    console.error("Erreur inattendue lors de la désactivation du 2FA :", error);
  }
}

export async function vertifyOneTimePassword(
  setupState: SetupState,
  setSetupState: (state: SetStateAction<SetupState>) => void,
  resetSetupState: () => void,
) {
  if (setupState.verificationAttempts >= MAX_VERIFICATION_ATTEMPTS) {
    updateSetupState(
      {
        error:
          "Nombre maximum de tentatives de vérification atteint. Veuillez réessayer.",
        verificationCode: "",
      },
      setSetupState,
    );
    return;
  }

  try {
    await twoFactor.verifyTotp(
      {
        code: setupState.verificationCode,
      },
      {
        onRequest: () => {
          updateSetupState({ isLoading: true, error: "" }, setSetupState);
          toast.loading("Vérification du code...", { id: "verifyTotpToast" });
        },
        onSuccess: async () => {
          resetSetupState();
          toast.success("2FA activé avec succès", {
            id: "verifyTotpToast",
          });
        },
        onError: async (context: ErrorContext) => {
          const remainingAttempts =
            MAX_VERIFICATION_ATTEMPTS - (setupState.verificationAttempts + 1);
          const errorMessage =
            remainingAttempts > 0
              ? `Code invalide. ${remainingAttempts} tentatives restantes.`
              : "Nombre maximum de tentatives atteint. Veuillez réessayer.";

          updateSetupState(
            {
              verificationAttempts: setupState.verificationAttempts + 1,
              error: errorMessage,
              verificationCode: "",
              isLoading: false,
            },
            setSetupState,
          );

          toast.error(errorMessage, { id: "verifyTotpToast" });
          console.error("Erreur lors de la vérification du 2FA :", context);

          if (remainingAttempts === 0) {
            setTimeout(() => {
              resetSetupState();
              toast.error(
                "Veuillez redémarrer le processus de configuration du 2FA",
              );
            }, 2000);
          }
        },
      },
    );
  } catch (error) {
    console.error(
      "Erreur inattendue lors de la vérification du code du 2FA :",
      error,
    );
  }
}

export async function updatePassword(
  values: z.infer<typeof updatePasswordSchema>,
  router: RouterType,
) {
  await changePassword(
    {
      newPassword: values.password,
      currentPassword: values.currentPassword,
      revokeOtherSessions: values.revokeOtherSessions,
    },
    {
      onRequest: () => {
        toast.loading("Mise à jour du mot de passe...", {
          id: "updatePasswordToast",
        });
      },
      onSuccess: () => {
        toast.success("Mot de passe mis à jour avec succès", {
          id: "updatePasswordToast",
        });
        router.refresh();
      },
      onError: (ctx) => {
        toast.error(ctx.error.message ?? "Quelque chose s'est mal passé.", {
          id: "updatePasswordToast",
        });
      },
    },
  );
}
