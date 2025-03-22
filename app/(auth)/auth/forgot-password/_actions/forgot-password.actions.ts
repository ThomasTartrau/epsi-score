import { forgetPassword } from "@/lib/auth/client";
import { toast } from "sonner";
import { RouterType } from "../../../../_types/auth.types";

export const forgotPassword = async (email: string, router: RouterType) => {
  toast.loading("Envoi du lien de réinitialisation...", {
    id: "forgotPasswordToast",
  });

  await forgetPassword(
    {
      email: email,
      redirectTo: "/auth/resset-password",
    },
    {
      async onSuccess() {
        toast.success("Lien de réinitialisation envoyé à votre email", {
          id: "forgotPasswordToast",
        });
        router.push("/auth/login");
      },
      onError(context) {
        toast.error(
          context.error.message ||
            "Échec de l'envoi du lien de réinitialisation",
          { id: "forgotPasswordToast" },
        );
      },
    },
  );
};
