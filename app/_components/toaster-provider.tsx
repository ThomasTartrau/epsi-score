"use client";

import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export function ToasterProvider() {
  const isMobile = useIsMobile();
  const isCloseButton = isMobile ? false : true;
  const position = isMobile ? "top-center" : "bottom-right";

  return <Toaster closeButton={isCloseButton} position={position} />;
}
