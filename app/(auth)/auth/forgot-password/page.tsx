import { Suspense } from "react";
import { Metadata } from "next";
import { Spinner } from "@/components/custom/spinner";
import { APP_NAME } from "@/lib/constants";
import Logo from "@/components/custom/logo";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  description: "Réinitialisez votre mot de passe",
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center justify-center rounded-md">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold">
          Réinitialisez votre mot de passe {APP_NAME}
        </h1>
      </div>
      <Suspense fallback={<Spinner />}>
        <ForgotPasswordForm />
      </Suspense>
    </main>
  );
}
