import Logo from "@/components/custom/logo";
import { NewScoreForm } from "./_components/new-score.form";
import { Suspense } from "react";
import { Spinner } from "@/components/custom/spinner";
import { Metadata } from "next";

interface NewScorePageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Notez l'équipe",
  description: "Notez une équipe",
};

export default async function NewScorePage({ params }: NewScorePageProps) {
  const { id } = await params;

  return (
    <main className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center justify-center rounded-md">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold">Notez l&apos;équipe {id}</h1>
      </div>
      <Suspense fallback={<Spinner />}>
        <NewScoreForm teamId={id} />
      </Suspense>
    </main>
  );
}
