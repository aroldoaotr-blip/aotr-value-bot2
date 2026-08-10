"use client";

import type { ReactNode } from "react";
import { PriceSourceProvider } from "@/lib/price-source";

export function Providers({ children }: { children: ReactNode }) {
  return <PriceSourceProvider>{children}</PriceSourceProvider>;
}
