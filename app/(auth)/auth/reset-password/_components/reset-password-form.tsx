"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/custom/loading-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PasswordInput } from "@/components/custom/password-input";
import { resetPasswordSchema } from "../../../../_types/auth.types";
import { resetPasswordAction } from "../_actions/reset-password.actions";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (
    values: z.infer<typeof resetPasswordSchema>,
  ) => {
    if (!token) {
      toast.error("Jeton de réinitialisation invalide");
      return;
    }

    startTransition(async () => {
      try {
        toast.loading("Réinitialisation du mot de passe...", {
          id: "resetPasswordToast",
        });

        await resetPasswordAction(values, token, router);
      } catch (error) {
        toast.error((error as Error).message || "Quelque chose a mal tourné", {
          id: "resetPasswordToast",
        });
        console.error(error);
      }
    });
  };

  if (!token) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-muted-foreground text-base">
          Le lien de réinitialisation du mot de passe est invalide ou a expiré.
          Veuillez demander un nouveau lien de réinitialisation du mot de passe.
        </p>
        <Button variant="link" asChild className="text-base font-medium">
          <Link href="/auth/login">Retour à la page de connexion</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleResetPassword)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field: fieldProps }) => (
              <FormItem>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <FormControl>
                  <PasswordInput
                    type="password"
                    placeholder="Entrez votre nouveau mot de passe"
                    autoComplete="new-password"
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field: fieldProps }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <PasswordInput
                    type="password"
                    placeholder="Confirmez votre nouveau mot de passe"
                    autoComplete="new-password"
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={isPending} className="w-full">
            Réinitialiser le mot de passe
          </LoadingButton>
        </form>
      </Form>
      <div className="text-center text-sm">
        <Button variant="link" asChild>
          <Link href="/auth/login">Retour à la connexion</Link>
        </Button>
      </div>
    </>
  );
}
