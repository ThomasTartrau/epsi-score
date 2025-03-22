import { Suspense } from "react";
import { Metadata } from "next";
import { TwoFactorVerify } from "./_components/two-factor-verify";
import Logo from "@/components/custom/logo";
import { Spinner } from "@/components/custom/spinner";

export const metadata: Metadata = {
  title: "Authentification à deux facteurs",
  description:
    "Vérifiez votre identité avec l&apos;authentification à deux facteurs",
};

export default function LoginPage() {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center justify-center rounded-md">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold">Authentification à deux facteurs</h1>
      </div>
      <Suspense fallback={<Spinner />}>
        <TwoFactorVerify />
      </Suspense>
    </main>
  );
}
