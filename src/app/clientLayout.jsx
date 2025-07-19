"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import ToastProvider from "@/components/ToastProvider";
import YandexMetrika from "@/components/yandexMetrika";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function ClientLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <YandexMetrika />
        <ParticlesBackground />
        {children}
      </ToastProvider>
    </QueryClientProvider>
  );
}
