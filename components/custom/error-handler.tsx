"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export function ErrorHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast.error(decodeURIComponent(error));

      // Create new URLSearchParams without the error parameter
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("error");

      // Replace the URL without the error parameter
      const newPathname =
        window.location.pathname +
        (newSearchParams.toString() ? `?${newSearchParams.toString()}` : "");
      router.replace(newPathname);
    }
  }, [searchParams, router]);

  return null;
}
