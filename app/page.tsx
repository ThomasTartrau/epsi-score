import { Suspense } from "react";
import { ScoresLoading } from "./_components/leaderboard/scores-loading";
import Logo from "@/components/custom/logo";
import ClientLeaderboard from "./_components/leaderboard/client-leaderbord";

export default function Home() {
  return (
    <div className="from-background via-background to-background dark:from-background dark:via-background dark:to-background flex min-h-screen w-full flex-col items-center bg-gradient-to-b p-4 sm:p-8 md:p-16">
      <div className="relative container max-w-5xl">
        <header className="mb-12 flex w-full flex-col items-center">
          <div className="mb-6 flex flex-col items-center gap-3 md:flex-row">
            <Logo size="lg" className="mb-3 md:mb-0" />
            <h1 className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
              EPSI OpenInnovation
            </h1>
          </div>

          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
            <p className="text-center text-lg font-medium text-green-700 dark:text-green-300">
              Saison 1
            </p>
          </div>

          <div className="h-1 w-full max-w-md rounded-full bg-gradient-to-r from-transparent via-green-500/60 to-transparent" />
        </header>

        <main className="flex w-full flex-col items-center">
          <Suspense fallback={<ScoresLoading />}>
            <ClientLeaderboard />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
