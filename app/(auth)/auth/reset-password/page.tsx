import { Suspense } from "react";
import { Metadata } from "next";
import { Spinner } from "@/components/custom/spinner";
import { APP_NAME } from "@/lib/constants";
import Logo from "@/components/custom/logo";
import { ResetPasswordForm } from "./_components/reset-password-form";

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe",
  description: "Réinitialisez votre mot de passe",
};

export default function ResetPasswordPage() {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center justify-center rounded-md">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold">
          Créez un nouveau mot de passe pour {APP_NAME}
        </h1>
      </div>
      <Suspense fallback={<Spinner />}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
