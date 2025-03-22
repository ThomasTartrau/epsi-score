"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/custom/loading-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { forgotPassword } from "../_actions/forgot-password.actions";
import { forgotPasswordSchema } from "../../../../_types/auth.types";
import { useRouter } from "next/navigation";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (
    values: z.infer<typeof forgotPasswordSchema>,
  ) => {
    startTransition(async () => {
      await forgotPassword(values.email, router);
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleForgotPassword)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field: fieldProps }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Entrez votre email"
                    autoComplete="email"
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={isPending} className="w-full">
            Envoyer le lien de réinitialisation
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
