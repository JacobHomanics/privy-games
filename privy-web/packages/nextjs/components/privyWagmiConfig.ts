import { base } from "@privy-io/chains";
import { createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});
