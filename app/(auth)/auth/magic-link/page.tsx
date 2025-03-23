import { Metadata } from "next";
import Logo from "@/components/custom/logo";

export const metadata: Metadata = {
  title: "Lien de connexion",
  description: "Un lien de connexion a été envoyé à votre email.",
};

export default function MagicLinkPage() {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center justify-center rounded-md">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold">
          Un lien de connexion a été envoyé à votre email.
        </h1>
      </div>
    </main>
  );
}
