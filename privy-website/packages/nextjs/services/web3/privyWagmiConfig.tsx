import { createConfig } from "@privy-io/wagmi";
import { base } from "viem/chains";
import { http } from "wagmi";

export const wagmiConfig = createConfig({
  chains: [base], // Pass your required chains as an array
  transports: {
    [base.id]: http(),
  },
});
