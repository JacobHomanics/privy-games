"use client";

// import { useEffect, useState } from "react";
import { config } from "./privyWagmiConfig";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
// import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
// import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
// import { WagmiProvider } from "wagmi";
// import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
// import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-eth";

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

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//     },
//   },
// });

const queryClient = new QueryClient();

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  // const { resolvedTheme } = useTheme();
  // const isDarkMode = resolvedTheme === "dark";
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!} clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID!}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {/* <RainbowKitProvider
            avatar={BlockieAvatar}
            theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
          > */}
          <ProgressBar height="3px" color="#2299dd" />

          <ScaffoldEthApp>{children}</ScaffoldEthApp>
          {/* </RainbowKitProvider> */}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};
