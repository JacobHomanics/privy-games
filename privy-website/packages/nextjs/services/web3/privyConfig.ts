import { PrivyClientConfig } from "@privy-io/react-auth";

export const privyConfig: PrivyClientConfig = {
  // Create embedded wallets for users who don't have a wallet
  embeddedWallets: {
    ethereum: {
      createOnLogin: "users-without-wallets",
    },
  },
};
