import { signIn } from "@/lib/auth/client";
import { RouterType, signInSchema } from "../../../../_types/auth.types";
import { toast } from "sonner";
import { AUTHENTICATED_URL } from "@/lib/constants";
import { ErrorContext } from "better-auth/client";
import { z } from "zod";

export const signInWithMagicLink = async (
  values: z.infer<typeof signInSchema>,
  callbackUrl: string | null,
  router: RouterType,
) => {
  const TURNSTILE_SITE_KEY = "0x4AAAAAABC1sq0iRNcIal-9";

  await signIn.magicLink(
    {
      email: values.email,
      callbackURL: callbackUrl ?? AUTHENTICATED_URL,
      fetchOptions: {
        headers: {
          "x-captcha-response": TURNSTILE_SITE_KEY,
        },
      },
    },
    {
      onRequest: () => {
        toast.loading("Envoi du lien de connexion...", { id: "signInToast" });
      },
      onSuccess: async () => {
        toast.success(
          "Un lien de connexion a été envoyé à votre email. Veuillez vérifier votre boite mail.",
          {
            id: "signInToast",
          },
        );
        router.push("/auth/magic-link");
      },
      onError: async (context: ErrorContext) => {
        toast.error(context.error.message ?? "Quelque chose s'est mal passé.", {
          id: "signInToast",
        });
      },
    },
  );
};
