"use client";

import { useEffect, useState } from "react";
import { BlockieAvatar } from "./scaffold-eth/BlockieAvatar";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { privyConfig } from "~~/services/web3/privyConfig";
import { wagmiConfig } from "~~/services/web3/privyWagmiConfig";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice();

  return (
    <>
      <div className={`flex flex-col min-h-screen `}>
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PrivyProvider
      appId="cmeh43a0o004fjx0c1t2z9i9e"
      clientId="client-WY6PpL6tjtD39SatcEvNb9Zm2tQq4geqPokJjutTD3RpW"
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <RainbowKitProvider
            avatar={BlockieAvatar}
            theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
          >
            <ProgressBar height="3px" color="#2299dd" />
            <ScaffoldEthApp>{children}</ScaffoldEthApp>
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};
