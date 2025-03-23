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

import { signInWithMagicLink } from "../_actions/login.actions";
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
          <LoadingButton loading={isPending} className="w-full">
            Envoyer un lien de connexion
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
