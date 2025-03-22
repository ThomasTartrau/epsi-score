import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Spinner } from "@/components/custom/spinner";
import { UserProfileForm } from "./_components/user-profile-form";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/server";
import { Session } from "@/lib/auth/types";
import { UserEmailForm } from "./_components/user-email-form";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_NAME} - Paramètres`,
  description: "Gérer vos paramètres de compte",
};

export default async function SettingsAccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="space-y-12 lg:max-w-2xl">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profil</h3>
          <p className="text-muted-foreground text-sm">
            Mettez à jour vos paramètres de compte. Changez votre nom et votre
            photo de profil.
          </p>
        </div>
        <Separator />
        <Suspense fallback={<Spinner />}>
          <UserProfileForm session={session as Session} />
        </Suspense>
      </div>
      {/* TODO: Enable email change */}
      <div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Email</h3>
            <p className="text-muted-foreground text-sm">
              Mettez à jour vos paramètres de compte. Changez votre email.
            </p>
          </div>
          <Separator />
          <Suspense fallback={<Spinner />}>
            <UserEmailForm session={session as Session} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
