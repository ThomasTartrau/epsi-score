import { Suspense } from "react";
import { Metadata } from "next";
import { Spinner } from "@/components/custom/spinner";
import Logo from "@/components/custom/logo";
import { RegisterForm } from "./_components/register-form";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Créer un compte",
};

export default function SignUpPage() {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center justify-center rounded-md">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold">Welcome !</h1>
      </div>
      <Suspense fallback={<Spinner />}>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
