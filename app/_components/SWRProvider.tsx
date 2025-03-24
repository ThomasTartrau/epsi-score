"use client";

import { SWRConfig } from "swr";
import { PropsWithChildren } from "react";

// Default configuration for SWR
const defaultConfig = {
  // Default refreshInterval is 0 (disabled)
  // You can override this in individual useSWR calls
  refreshInterval: 0,
  revalidateOnFocus: true,
  shouldRetryOnError: true,
  dedupingInterval: 1000,
};

export default function SWRProvider({ children }: PropsWithChildren) {
  return <SWRConfig value={defaultConfig}>{children}</SWRConfig>;
}
