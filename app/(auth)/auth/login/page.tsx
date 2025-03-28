import { Suspense } from "react";
import { Metadata } from "next";
import { Spinner } from "@/components/custom/spinner";
import Logo from "@/components/custom/logo";
import { LoginForm } from "./_components/login.form";
import { ENVIRONMENT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre compte",
};

export default function LoginPage() {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center justify-center rounded-md">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold">Bon retour parmi nous !</h1>
      </div>
      <Suspense fallback={<Spinner />}>
        <LoginForm nodeEnv={ENVIRONMENT} />
      </Suspense>
    </main>
  );
}
