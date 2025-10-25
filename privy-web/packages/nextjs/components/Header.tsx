"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaucetButton2 } from "./scaffold-eth/FaucetButton2";
import { AddressQRCodeModal } from "./scaffold-eth/RainbowKitCustomConnectButton/AddressQRCodeModal";
import { UserInfoDropdown } from "./scaffold-eth/UserInfoDropdown";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { Address } from "viem";
import { hardhat } from "viem/chains";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import {
  Balance, //FaucetButton, RainbowKitCustomConnectButton
} from "~~/components/scaffold-eth";
import { useNetworkColor, useOutsideClick, useTargetNetwork } from "~~/hooks/scaffold-eth";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  const burgerMenuRef = useRef<HTMLDetailsElement>(null);
  useOutsideClick(burgerMenuRef, () => {
    burgerMenuRef?.current?.removeAttribute("open");
  });

  const { login } = useLogin();
  const { user } = usePrivy();

  const networkColor = useNetworkColor();

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <details className="dropdown" ref={burgerMenuRef}>
          <summary className="ml-1 btn btn-ghost lg:hidden hover:bg-transparent">
            <Bars3Icon className="h-1/2" />
          </summary>
          <ul
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-sm bg-base-100 rounded-box w-52"
            onClick={() => {
              burgerMenuRef?.current?.removeAttribute("open");
            }}
          >
            <HeaderMenuLinks />
          </ul>
        </details>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Scaffold-ETH</span>
            <span className="text-xs">Ethereum dev stack</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end grow mr-4">
        {!user ? (
          <button className="btn btn-primary btn-sm" onClick={login} type="button">
            Sign in
          </button>
        ) : (
          <>
            <div className="flex flex-col items-center mr-1">
              <Balance address={user?.wallet?.address as Address} className="min-h-0 h-auto" />
              <span className="text-xs" style={{ color: networkColor }}>
                {targetNetwork.name.toUpperCase()}
              </span>
            </div>
            <UserInfoDropdown
              address={user?.wallet?.address as Address}
              email={user?.email?.address || ""}
              blockExplorerAddressLink={getBlockExplorerAddressLink(targetNetwork, user?.wallet?.address || "")}
            />
          </>
        )}
        {/* <RainbowKitCustomConnectButton /> */}
        {/* {isLocalNetwork && <FaucetButton />} */}
        {isLocalNetwork && <FaucetButton2 />}
        {user?.wallet?.address && (
          <AddressQRCodeModal address={user.wallet.address as Address} modalId="qrcode-modal" />
        )}
      </div>
    </div>
  );
};
