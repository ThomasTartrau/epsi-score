import { signIn } from "@/lib/auth/client";
import { RouterType, signInSchema } from "../../../../_types/auth.types";
import { toast } from "sonner";
import { AUTHENTICATED_URL } from "@/lib/constants";
import { ErrorContext } from "better-auth/client";
import { z } from "zod";

export const openSignUpPage = (
  callbackUrl: string | null,
  router: RouterType,
) => {
  const encodedCallbackUrl = encodeURIComponent(callbackUrl ?? "");

  if (!callbackUrl) {
    router.push("/auth/register");
  } else {
    router.push(`/auth/register?callbackUrl=${encodedCallbackUrl}`);
  }
};

export const signInWithCredentials = async (
  values: z.infer<typeof signInSchema>,
  callbackUrl: string | null,
  router: RouterType,
) => {
  await signIn.email(
    {
      email: values.email,
      password: values.password,
    },
    {
      onRequest: () => {
        toast.loading("Connexion en cours...", { id: "signInToast" });
      },
      onSuccess: async () => {
        toast.success("Connecté avec succès", { id: "signInToast" });
        router.push(callbackUrl ?? AUTHENTICATED_URL);
        router.refresh();
      },
      onError: async (context: ErrorContext) => {
        toast.error(context.error.message ?? "Quelque chose a mal tourné.", {
          id: "signInToast",
        });
      },
    },
  );
};
