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
import { Input } from "@/components/ui/input";
import { Session } from "@/lib/auth/types";
import { updateEmailSchema } from "../_types/settings.types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoadingButton } from "@/components/custom/loading-button";
import { updateEmail } from "../_actions/settings";

interface UserEmailFormProps {
  session: Session | null;
}

export function UserEmailForm({ session }: UserEmailFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof updateEmailSchema>>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: session?.user?.email ?? "",
    },
  });
  const { isDirty } = form.formState;

  function onSubmit(values: z.infer<typeof updateEmailSchema>) {
    startTransition(async () => {
      form.reset({ email: values.email });
      await updateEmail(values, router);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@email.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Nous ne partagerons jamais votre email avec personne.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton disabled={!isDirty} loading={isPending}>
          Mettre à jour l&apos;email
        </LoadingButton>
      </form>
    </Form>
  );
}
