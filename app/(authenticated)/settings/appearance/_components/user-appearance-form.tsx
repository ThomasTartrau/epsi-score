"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function UserAppearanceForm() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div className="relative">
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "group relative w-full overflow-hidden rounded-lg border-2 bg-white transition-all hover:shadow-lg",
            theme === "light"
              ? "border-primary ring-primary/20 ring-2"
              : "border-muted hover:border-primary/50",
          )}
          aria-label="Passer au thème clair"
        >
          <div className="relative aspect-[1/1.2]">
            <Image
              src="/appearance/ui-light.png"
              alt="Aperçu du thème clair"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="from-background/80 via-background/20 to-background/0 absolute inset-0 bg-gradient-to-t" />
          </div>
          <div className="absolute right-0 bottom-0 left-0 p-4 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2">
              {theme === "light" && (
                <Check className="text-primary animate-in fade-in h-4 w-4" />
              )}
              <p className="font-medium">Clair</p>
            </div>
          </div>
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "group relative w-full overflow-hidden rounded-lg border-2 bg-zinc-950 transition-all hover:shadow-lg",
            theme === "dark"
              ? "border-primary ring-primary/20 ring-2"
              : "border-muted hover:border-primary/50",
          )}
          aria-label="Passer au thème sombre"
        >
          <div className="relative aspect-[1/1.2]">
            <Image
              src="/appearance/ui-dark.png"
              alt="Aperçu du thème sombre"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="from-background/80 via-background/20 to-background/0 absolute inset-0 bg-gradient-to-t" />
          </div>
          <div className="absolute right-0 bottom-0 left-0 p-4 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2">
              {theme === "dark" && (
                <Check className="text-primary animate-in fade-in h-4 w-4" />
              )}
              <p className="font-medium">Sombre</p>
            </div>
          </div>
        </button>
      </div>

      <div className="relative sm:col-span-2 lg:col-span-1">
        <button
          onClick={() => setTheme("system")}
          className={cn(
            "group relative w-full overflow-hidden rounded-lg border-2 transition-all hover:shadow-lg",
            theme === "system"
              ? "border-primary ring-primary/20 ring-2"
              : "border-muted hover:border-primary/50",
          )}
          aria-label="Utiliser le thème système"
        >
          <div className="relative aspect-[1/1.2]">
            <Image
              src="/appearance/ui-system.png"
              alt="Aperçu du thème système"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="from-background/80 via-background/20 to-background/0 absolute inset-0 bg-gradient-to-t" />
          </div>
          <div className="absolute right-0 bottom-0 left-0 p-4 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2">
              {theme === "system" && (
                <Check className="text-primary animate-in fade-in h-4 w-4" />
              )}
              <p className="font-medium">Système</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
