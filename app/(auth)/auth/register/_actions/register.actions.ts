import { signUp } from "@/lib/auth/client";
import { signUpSchema, RouterType } from "../../../../_types/auth.types";
import { toast } from "sonner";
import { z } from "zod";
import { AUTHENTICATED_URL } from "@/lib/constants";

export const openLoginPage = (
  callbackUrl: string | null,
  router: RouterType,
) => {
  const encodedCallbackUrl = encodeURIComponent(callbackUrl ?? "");
  if (!callbackUrl) {
    router.push("/auth/login");
  } else {
    router.push(`/auth/login?callbackUrl=${encodedCallbackUrl}`);
  }
};

export const signUpWithCredentials = async (
  values: z.infer<typeof signUpSchema>,
  callbackUrl: string | null,
  router: RouterType,
) => {
  await signUp.email(
    {
      email: values.email,
      password: values.password,
      name: values.name,
    },
    {
      onRequest: () => {
        toast.loading("Création du compte...", { id: "signUpToast" });
      },
      onSuccess: () => {
        toast.success("Vérification de l'email envoyée.", {
          id: "signUpToast",
          description:
            "Veuillez vérifier votre email pour valider votre compte.",
          duration: Infinity,
        });
        router.push(callbackUrl ?? AUTHENTICATED_URL);
      },
      onError: (ctx) => {
        toast.error(ctx.error.message ?? "Quelque chose s'est mal passé.", {
          id: "signUpToast",
        });
      },
    },
  );
};
