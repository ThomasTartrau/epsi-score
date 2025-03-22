import { changeEmail, updateUser } from "@/lib/auth/client";
import { toast } from "sonner";
import {
  updateEmailSchema,
  updateProfileSchema,
} from "../_types/settings.types";
import { z } from "zod";
import { RouterType } from "@/app/_types/auth.types";

export async function updateEmail(
  values: z.infer<typeof updateEmailSchema>,
  router: RouterType,
) {
  await changeEmail(
    {
      newEmail: values.email,
    },
    {
      onRequest: () => {
        toast.loading("Mise à jour de l'email...", {
          id: "updateEmailToast",
        });
      },
      onSuccess: () => {
        toast.success("Email mis à jour avec succès", {
          id: "updateEmailToast",
        });
        router.refresh();
      },
      onError: (ctx) => {
        toast.error(ctx.error.message ?? "Une erreur est survenue.", {
          id: "updateEmailToast",
        });
      },
    },
  );
}

export async function updateProfile(
  values: z.infer<typeof updateProfileSchema>,
  router: RouterType,
) {
  await updateUser(
    {
      name: values.name,
      image: values.image,
    },
    {
      onRequest: () => {
        toast.loading("Mise à jour du profil...", {
          id: "updateProfileToast",
        });
      },
      onSuccess: () => {
        toast.success("Profil mis à jour avec succès", {
          id: "updateProfileToast",
        });
        router.refresh();
      },
      onError: (ctx) => {
        toast.error(ctx.error.message ?? "Une erreur est survenue.", {
          id: "updateProfileToast",
        });
      },
    },
  );
}
