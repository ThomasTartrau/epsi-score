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
import { Turnstile } from "@marsidev/react-turnstile";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { signInWithMagicLink } from "../_actions/login.actions";
import { useRouter } from "next/navigation";

export function LoginForm({ nodeEnv }: { nodeEnv: string }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const TURNSTILE_SITE_KEY = "0x4AAAAAABC1sq0iRNcIal-9";

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleMagicLinkSignIn = async (
    values: z.infer<typeof signInSchema>,
    callbackUrl: string,
  ) => {
    startTransition(async () => {
      await signInWithMagicLink(values, callbackUrl, router);
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            handleMagicLinkSignIn(values, callbackUrl ?? ""),
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
          {nodeEnv === "production" && (
            <Turnstile siteKey={TURNSTILE_SITE_KEY} />
          )}
          <LoadingButton loading={isPending} className="w-full">
            Envoyer un lien de connexion
          </LoadingButton>
        </form>
      </Form>
      <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        En cliquant sur continuer, vous acceptez nos{" "}
        <a href="/terms">Conditions d&apos;utilisation</a> et{" "}
        <a href="/privacy">Politique de confidentialité</a>.
      </div>
    </>
  );
}
