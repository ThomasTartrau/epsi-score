import { twoFactor } from "@/lib/auth/client";
import type { ErrorContext } from "better-auth/client";
import { toast } from "sonner";
import { VerifyState } from "../_types/two-factor.types";
import { RouterType } from "../../../../_types/auth.types";

export const verifyTotp = async (
  code: string,
  updateState: (updates: Partial<VerifyState>) => void,
  router: RouterType,
) => {
  try {
    await twoFactor.verifyTotp(
      {
        code: code,
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
