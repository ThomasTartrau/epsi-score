"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from "@/components/custom/logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="dark:via-background flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-green-50/20 via-white to-green-50/20 p-4 sm:p-8 md:p-16 dark:from-green-950/20 dark:to-green-950/10">
      <motion.div
        className="container max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-12 flex w-full flex-col items-center">
          <motion.div
            className="mb-6 flex flex-col items-center gap-3 md:flex-row"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Logo size="lg" className="mb-3 md:mb-0" />
            <h1 className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
              EPSI OpenInnovation
            </h1>
          </motion.div>

          <motion.div
            className="h-1 w-full max-w-md rounded-full bg-gradient-to-r from-transparent via-green-500/60 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </header>

        <main className="flex w-full flex-col items-center">
          <motion.div
            className="dark:bg-background mt-8 max-w-xl rounded-lg border border-green-300 bg-white p-8 text-center shadow-sm dark:border-green-800"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-green-700 dark:text-green-300">
              Une erreur s&apos;est produite
            </h2>
            <p className="mb-6 text-slate-700 dark:text-slate-300">
              Impossible de charger le classement. Veuillez réessayer dans
              quelques instants.
            </p>
            <Button
              variant="outline"
              onClick={reset}
              className="border-green-500 font-medium text-green-700 transition-all hover:border-green-600 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-950/30"
            >
              Réessayer
            </Button>
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}
