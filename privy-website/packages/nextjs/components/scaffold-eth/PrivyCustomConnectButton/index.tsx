"use client";

// @refresh reset
import { Balance } from "../Balance";
import { AddressQRCodeModal } from "../RainbowKitCustomConnectButton/AddressQRCodeModal";
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { Address } from "viem";
import { useAccount, useSwitchChain } from "wagmi";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const PrivyCustomConnectButton = () => {
  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();

  const { switchChain } = useSwitchChain();

  const { login } = useLogin({
    onComplete: () => {
      switchChain?.({ chainId: 8453 });
    },
  });
  const account = useAccount();

  const { user } = usePrivy();

  const { ready, authenticated } = usePrivy();
  const connected = ready && authenticated;
  const blockExplorerAddressLink = account.address
    ? getBlockExplorerAddressLink(targetNetwork, account.address)
    : undefined;

  return (
    <>
      {(() => {
        if (!connected) {
          return (
            <button
              className="btn btn-primary btn-sm"
              onClick={async () => {
                await login();
              }}
              type="button"
            >
              Connect Wallet
            </button>
          );
        }

        if (account.chainId !== targetNetwork.id) {
          return <WrongNetworkDropdown />;
        }

        return (
          <>
            <div className="flex flex-col items-center mr-1">
              <Balance address={account.address as Address} className="min-h-0 h-auto" />
              <span className="text-xs" style={{ color: networkColor }}>
                {account.chain?.name}
              </span>
            </div>
            <AddressInfoDropdown
              address={account.address as Address}
              displayName={user?.email?.address ?? ""}
              ensAvatar={undefined}
              blockExplorerAddressLink={blockExplorerAddressLink}
            />
            <AddressQRCodeModal address={account.address as Address} modalId="qrcode-modal" />
          </>
        );
      })()}
    </>
  );
};
