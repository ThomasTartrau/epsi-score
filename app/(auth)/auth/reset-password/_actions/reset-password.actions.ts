import { z } from "zod";
import { resetPasswordSchema } from "../../../../_types/auth.types";
import { toast } from "sonner";
import { ErrorContext } from "better-auth/react";
import { resetPassword } from "@/lib/auth/client";
import { RouterType } from "../../../../_types/auth.types";
export const resetPasswordAction = async (
  values: z.infer<typeof resetPasswordSchema>,
  token: string,
  router: RouterType,
) => {
  await resetPassword(
    {
      newPassword: values.password,
      token,
    },
    {
      async onSuccess() {
        toast.success("Mot de passe réinitialisé avec succès", {
          id: "resetPasswordToast",
        });
        router.push("/auth/login");
      },
      onError(context: ErrorContext) {
        toast.error(
          context.error.message ||
            "Échec de la réinitialisation du mot de passe",
          {
            id: "resetPasswordToast",
          },
        );
      },
    },
  );
};
