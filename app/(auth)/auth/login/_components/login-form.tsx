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
import { signInSchema } from "../../../../_types/auth.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { PasswordInput } from "@/components/custom/password-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  openSignUpPage,
  signInWithCredentials,
} from "../_actions/login.actions";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleCredentialsSignIn = async (
    values: z.infer<typeof signInSchema>,
    callbackUrl: string,
  ) => {
    startTransition(async () => {
      await signInWithCredentials(values, callbackUrl, router);
    });
  };

  return (
    <>
      <div className="text-center text-sm">
        <Button
          variant="link"
          onClick={() => openSignUpPage(callbackUrl, router)}
        >
          Vous n&apos;avez pas de compte ? Inscrivez-vous
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            handleCredentialsSignIn(values, callbackUrl ?? ""),
          )}
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
          <FormField
            control={form.control}
            name="password"
            render={({ field: fieldProps }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Mot de passe</FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="px-0 text-xs font-normal hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    autoComplete="password"
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={isPending} className="w-full">
            Se connecter
          </LoadingButton>
        </form>
      </Form>
      <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        En cliquant sur continuer, vous acceptez nos{" "}
        <a href="/terms-of-service">Conditions d&apos;utilisation</a> et{" "}
        <a href="/privacy-policy">Politique de confidentialité</a>.
      </div>
    </>
  );
}
