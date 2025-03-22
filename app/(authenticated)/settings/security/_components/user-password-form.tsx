"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoadingButton } from "@/components/custom/loading-button";
import { PasswordInput } from "@/components/custom/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { updatePasswordSchema } from "../../_types/settings.types";
import { updatePassword } from "../_actions/security.actions";

export function UserPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
      revokeOtherSessions: false,
    },
  });
  const { isDirty } = form.formState;

  function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
    startTransition(async () => {
      form.reset();
      await updatePassword(values, router);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe actuel</FormLabel>
              <FormControl>
                <PasswordInput type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <PasswordInput type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <PasswordInput type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="revokeOtherSessions"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Révoquer toutes les autres sessions</FormLabel>
                <FormDescription>
                  Cela vous déconnectera de tous les autres appareils et
                  sessions sauf celle en cours.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <LoadingButton disabled={!isDirty} loading={isPending}>
          Mettre à jour le mot de passe
        </LoadingButton>
      </form>
    </Form>
  );
}
