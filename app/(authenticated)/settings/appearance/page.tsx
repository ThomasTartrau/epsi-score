import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Spinner } from "@/components/custom/spinner";
import { UserAppearanceForm } from "./_components/user-appearance-form";
import { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} - Apparence`,
  description: "Gérer l'apparence de l'application",
};

export default function AppearancePage() {
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Apparence</h3>
        <p className="text-muted-foreground text-sm">
          Personnalisez l&apos;apparence de l&apos;application sur votre
          appareil.
        </p>
      </div>
      <Separator />
      <Suspense fallback={<Spinner />}>
        <UserAppearanceForm />
      </Suspense>
    </div>
  );
}
