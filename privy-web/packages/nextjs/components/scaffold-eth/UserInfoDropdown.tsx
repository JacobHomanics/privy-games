import {
  useRef, // useState
} from "react";
import { usePrivy } from "@privy-io/react-auth";
import { getAddress } from "viem";
import { Address } from "viem";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import {
  BlockieAvatar, //isENS
} from "~~/components/scaffold-eth";
import { useCopyToClipboard, useOutsideClick } from "~~/hooks/scaffold-eth";

// import { getTargetNetworks } from "~~/utils/scaffold-eth";

// const allowedNetworks = getTargetNetworks();

type UserInfoDropdownProps = {
  address: Address;
  email: string;
  blockExplorerAddressLink: string | undefined;
};

export const UserInfoDropdown = ({ address, email, blockExplorerAddressLink }: UserInfoDropdownProps) => {
  const {
    //user,
    logout,
  } = usePrivy();

  // const { disconnect } = useDisconnect();
  const checkSumAddress = getAddress(address);

  const { copyToClipboard: copyAddressToClipboard, isCopiedToClipboard: isAddressCopiedToClipboard } =
    useCopyToClipboard();
  const { copyToClipboard: copyEmailToClipboard, isCopiedToClipboard: isEmailCopiedToClipboard } = useCopyToClipboard();
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  const closeDropdown = () => {
    dropdownRef.current?.removeAttribute("open");
  };

  useOutsideClick(dropdownRef, closeDropdown);

  return (
    <>
      <details ref={dropdownRef} className="dropdown dropdown-end leading-3">
        <summary className="btn btn-primary btn-sm pl-0 pr-2 shadow-md dropdown-toggle gap-0 h-auto!">
          <span className="ml-2 mr-1">{email}</span>
          <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
        </summary>
        <ul className="dropdown-content menu z-2 p-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1">
          <li>
            <div className="h-8 btn-sm rounded-xl! flex gap-3 py-3 cursor-pointer">
              <BlockieAvatar address={checkSumAddress} size={24} />
              <span className="whitespace-nowrap">
                {checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
              </span>
            </div>
          </li>
          <li>
            <div
              className="h-8 btn-sm rounded-xl! flex gap-3 py-3 cursor-pointer"
              onClick={() => copyEmailToClipboard(email)}
            >
              {isEmailCopiedToClipboard ? (
                <>
                  <CheckCircleIcon className="text-xl font-normal h-6 w-4 ml-2 sm:ml-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">Email copied!</span>
                </>
              ) : (
                <>
                  <DocumentDuplicateIcon className="text-xl font-normal h-6 w-4 ml-2 sm:ml-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">Copy email</span>
                </>
              )}
            </div>
          </li>
          <li>
            <div
              className="h-8 btn-sm rounded-xl! flex gap-3 py-3 cursor-pointer"
              onClick={() => copyAddressToClipboard(checkSumAddress)}
            >
              {isAddressCopiedToClipboard ? (
                <>
                  <CheckCircleIcon className="text-xl font-normal h-6 w-4 ml-2 sm:ml-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">Address copied!</span>
                </>
              ) : (
                <>
                  <DocumentDuplicateIcon className="text-xl font-normal h-6 w-4 ml-2 sm:ml-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">Copy address</span>
                </>
              )}
            </div>
          </li>
          <li>
            <label htmlFor="qrcode-modal" className="h-8 btn-sm rounded-xl! flex gap-3 py-3">
              <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap">View QR Code</span>
            </label>
          </li>
          <li>
            <button className="h-8 btn-sm rounded-xl! flex gap-3 py-3" type="button">
              <ArrowTopRightOnSquareIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <a
                target="_blank"
                href={blockExplorerAddressLink}
                rel="noopener noreferrer"
                className="whitespace-nowrap"
              >
                View on Block Explorer
              </a>
            </button>
          </li>
          <li>
            <button
              className="menu-item text-error h-8 btn-sm rounded-xl! flex gap-3 py-3"
              type="button"
              onClick={async () => await logout()}
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
            </button>
          </li>
        </ul>
      </details>
    </>
  );
};
