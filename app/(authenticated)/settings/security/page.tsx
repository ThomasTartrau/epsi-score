import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Spinner } from "@/components/custom/spinner";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/server";
import { Session } from "@/lib/auth/types";
import { UserPasswordForm } from "./_components/user-password-form";
import { UserDeleteForm } from "./_components/user-delete-form";
import { TwoFactorSetup } from "./_components/two-factor-setup";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_NAME} - Sécurité`,
  description: "Gérez la sécurité de votre compte",
};

export default async function SettingsAccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="space-y-12 lg:max-w-2xl">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Changer le mot de passe</h3>
          <p className="text-muted-foreground text-sm">
            Mettez à jour votre mot de passe.
          </p>
        </div>
        <Separator />
        <Suspense fallback={<Spinner />}>
          <UserPasswordForm />
        </Suspense>
      </div>
      <div className="space-y-6">
        <Suspense fallback={<Spinner />}>
          <TwoFactorSetup />
        </Suspense>
      </div>
      <div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Supprimer le compte</h3>
            <p className="text-muted-foreground text-sm">
              En supprimant votre compte, vous serez déconnecté et votre compte
              ainsi que toutes ses données seront définitivement supprimés.
            </p>
          </div>
          <Separator />
          <Suspense fallback={<Spinner />}>
            <UserDeleteForm session={session as Session} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
