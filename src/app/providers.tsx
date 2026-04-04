"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";

export default function RootProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      defaultTheme="system"
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
