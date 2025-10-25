"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [activeTab, setActiveTab] = useState<"buy" | "inventory" | "game">("buy");

  const { unityProvider } = useUnityContext({
    loaderUrl: "unity-build/0.0.6.loader.js",
    dataUrl: "unity-build/0.0.6.data",
    frameworkUrl: "unity-build/0.0.6.framework.js",
    codeUrl: "unity-build/0.0.6.wasm",
  });

  const [nftMetadata, setNftMetadata] = useState<{
    Sword?: any;
    Staff?: any;
    Bow?: any;
  }>({});

  const { writeContractAsync: writeSwordContractAsync } = useScaffoldWriteContract({ contractName: "Sword" });
  const { writeContractAsync: writeStaffContractAsync } = useScaffoldWriteContract({ contractName: "Staff" });
  const { writeContractAsync: writeBowContractAsync } = useScaffoldWriteContract({ contractName: "Bow" });

  // Read tokenURI for token 0 from each contract
  const { data: swordTokenURI } = useScaffoldReadContract({
    contractName: "Sword",
    functionName: "tokenURI",
    args: [0n],
  });

  const { data: staffTokenURI } = useScaffoldReadContract({
    contractName: "Staff",
    functionName: "tokenURI",
    args: [0n],
  });

  const { data: bowTokenURI } = useScaffoldReadContract({
    contractName: "Bow",
    functionName: "tokenURI",
    args: [0n],
  });

  const { data: staffBalance } = useScaffoldReadContract({
    contractName: "Staff",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: bowBalance } = useScaffoldReadContract({
    contractName: "Bow",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: swordBalance } = useScaffoldReadContract({
    contractName: "Sword",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  // Fetch metadata from IPFS URIs
  useEffect(() => {
    const fetchMetadata = async (uri: string, contractName: string) => {
      try {
        // Convert IPFS URI to HTTP gateway URL
        const httpUri = uri.replace("ipfs://", "https://olive-capitalist-mule-825.mypinata.cloud/ipfs/");
        const response = await fetch(httpUri);
        const metadata = await response.json();
        setNftMetadata(prev => ({ ...prev, [contractName]: metadata }));
      } catch (error) {
        console.error(`Error fetching ${contractName} metadata:`, error);
      }
    };

    if (swordTokenURI) {
      fetchMetadata(swordTokenURI, "Sword");
    }
    if (staffTokenURI) {
      fetchMetadata(staffTokenURI, "Staff");
    }
    if (bowTokenURI) {
      fetchMetadata(bowTokenURI, "Bow");
    }
  }, [swordTokenURI, staffTokenURI, bowTokenURI]);

  // Helper function to get image URL from metadata
  const getImageUrl = (metadata: any) => {
    if (!metadata) return null;

    // Handle different image field names
    const imageUrl = metadata.image || metadata.image_url || metadata.imageUrl;
    if (!imageUrl) return null;

    // Convert IPFS URLs to HTTP gateway URLs
    if (imageUrl.startsWith("ipfs://")) {
      return imageUrl.replace("ipfs://", "https://olive-capitalist-mule-825.mypinata.cloud/ipfs/");
    }

    return imageUrl;
  };

  // Mint functions for each contract
  const mintSword = async () => {
    if (!connectedAddress) return;
    await writeSwordContractAsync({
      functionName: "mint",
      args: [connectedAddress],
    });
  };

  const mintBow = async () => {
    if (!connectedAddress) return;
    await writeBowContractAsync({
      functionName: "mint",
      args: [connectedAddress],
    });
  };

  const mintStaff = async () => {
    if (!connectedAddress) return;
    await writeStaffContractAsync({
      functionName: "mint",
      args: [connectedAddress],
    });
  };

  // Render Buy Items Tab Content
  const renderBuyItemsTab = () => (
    <div className="px-5">
      <h2 className="text-2xl font-bold text-center mb-6">🛒 Store</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nftMetadata.Sword && (
          <div className="bg-base-200 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">⚔️ Sword</h3>
            {getImageUrl(nftMetadata.Sword) && (
              <div className="mb-3">
                <Image
                  src={getImageUrl(nftMetadata.Sword)}
                  alt="Sword NFT"
                  className="w-32 h-32 object-cover mx-auto rounded-lg border-2 border-base-300"
                  onError={e => {
                    e.currentTarget.style.display = "none";
                  }}
                  width={128}
                  height={128}
                />
              </div>
            )}
            <div className="text-left space-y-2">
              {nftMetadata.Sword.description && (
                <div>
                  <span className="font-semibold text-center block">Description</span>
                  <p className="text-sm mt-1 text-center">{nftMetadata.Sword.description}</p>
                </div>
              )}
              {nftMetadata.Sword.attributes && Array.isArray(nftMetadata.Sword.attributes) && (
                <div>
                  <span className="font-semibold text-primary">Attributes:</span>
                  <div className="ml-2 mt-1 space-y-1">
                    {nftMetadata.Sword.attributes.map((attr: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm bg-base-100 px-2 py-1 rounded">
                        <span className="text-gray-600">{attr.trait_type || "Unknown"}:</span>
                        <span className="font-medium">{attr.value || "N/A"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {nftMetadata.Sword.external_url && (
                <div>
                  <span className="font-semibold text-primary">External URL:</span>
                  <a
                    href={nftMetadata.Sword.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-500 hover:text-blue-700 underline text-sm"
                  >
                    View Details
                  </a>
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={async () => {
                  await mintSword();
                }}
                disabled={!connectedAddress}
                className="btn btn-primary"
              >
                Buy Sword
              </button>
            </div>
          </div>
        )}
        {nftMetadata.Staff && (
          <div className="bg-base-200 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">🦯 Staff</h3>
            {getImageUrl(nftMetadata.Staff) && (
              <div className="mb-3">
                <Image
                  src={getImageUrl(nftMetadata.Staff)}
                  alt="Staff NFT"
                  className="w-32 h-32 object-cover mx-auto rounded-lg border-2 border-base-300"
                  onError={e => {
                    e.currentTarget.style.display = "none";
                  }}
                  width={128}
                  height={128}
                />
              </div>
            )}
            <div className="text-left space-y-2">
              {nftMetadata.Staff.description && (
                <div>
                  <span className="font-semibold text-center block">Description</span>
                  <p className="text-sm mt-1 text-center">{nftMetadata.Staff.description}</p>
                </div>
              )}
              {nftMetadata.Staff.attributes && Array.isArray(nftMetadata.Staff.attributes) && (
                <div>
                  <span className="font-semibold text-secondary">Attributes:</span>
                  <div className="ml-2 mt-1 space-y-1">
                    {nftMetadata.Staff.attributes.map((attr: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm bg-base-100 px-2 py-1 rounded">
                        <span className="text-gray-600">{attr.trait_type || "Unknown"}:</span>
                        <span className="font-medium">{attr.value || "N/A"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {nftMetadata.Staff.external_url && (
                <div>
                  <span className="font-semibold text-secondary">External URL:</span>
                  <a
                    href={nftMetadata.Staff.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-500 hover:text-blue-700 underline text-sm"
                  >
                    View Details
                  </a>
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={async () => {
                  await mintStaff();
                }}
                disabled={!connectedAddress}
                className="btn btn-secondary"
              >
                Buy Staff
              </button>
            </div>
          </div>
        )}
        {nftMetadata.Bow && (
          <div className="bg-base-200 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">🏹 Bow</h3>
            {getImageUrl(nftMetadata.Bow) && (
              <div className="mb-3">
                <Image
                  src={getImageUrl(nftMetadata.Bow)}
                  alt="Bow NFT"
                  className="w-32 h-32 object-cover mx-auto rounded-lg border-2 border-base-300"
                  onError={e => {
                    e.currentTarget.style.display = "none";
                  }}
                  width={128}
                  height={128}
                />
              </div>
            )}
            <div className="text-left space-y-2">
              {nftMetadata.Bow.description && (
                <div>
                  <span className="font-semibold text-center block">Description</span>
                  <p className="text-sm mt-1 text-center">{nftMetadata.Bow.description}</p>
                </div>
              )}
              {nftMetadata.Bow.attributes && Array.isArray(nftMetadata.Bow.attributes) && (
                <div>
                  <span className="font-semibold text-accent">Attributes:</span>
                  <div className="ml-2 mt-1 space-y-1">
                    {nftMetadata.Bow.attributes.map((attr: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm bg-base-100 px-2 py-1 rounded">
                        <span className="text-gray-600">{attr.trait_type || "Unknown"}:</span>
                        <span className="font-medium">{attr.value || "N/A"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {nftMetadata.Bow.external_url && (
                <div>
                  <span className="font-semibold text-accent">External URL:</span>
                  <a
                    href={nftMetadata.Bow.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-500 hover:text-blue-700 underline text-sm"
                  >
                    View Details
                  </a>
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={async () => {
                  await mintBow();
                }}
                disabled={!connectedAddress}
                className="btn btn-accent"
              >
                Buy Bow
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render Inventory Tab Content
  const renderInventoryTab = () => (
    <div className="px-5">
      <h2 className="text-2xl font-bold text-center mb-6">🎒 Your Inventory</h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bowBalance && bowBalance > 0 && nftMetadata.Bow ? (
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-center">🏹 Bow</h3>
              <p className="text-center text-lg font-semibold mb-2">Quantity: {bowBalance.toString()}</p>
              {getImageUrl(nftMetadata.Bow) && (
                <div className="mb-3">
                  <Image
                    src={getImageUrl(nftMetadata.Bow)}
                    alt="Bow NFT"
                    className="w-32 h-32 object-cover mx-auto rounded-lg border-2 border-base-300"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                    }}
                    width={128}
                    height={128}
                  />
                </div>
              )}
            </div>
          ) : null}

          {staffBalance && staffBalance > 0 && nftMetadata.Staff ? (
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-center">🦯 Staff</h3>
              <p className="text-center text-lg font-semibold mb-2">Quantity: {staffBalance.toString()}</p>
              {getImageUrl(nftMetadata.Staff) && (
                <div className="mb-3">
                  <Image
                    src={getImageUrl(nftMetadata.Staff)}
                    alt="Staff NFT"
                    className="w-32 h-32 object-cover mx-auto rounded-lg border-2 border-base-300"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                    }}
                    width={128}
                    height={128}
                  />
                </div>
              )}
            </div>
          ) : null}

          {swordBalance && swordBalance > 0 && nftMetadata.Sword ? (
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-center">⚔️ Sword</h3>
              <p className="text-center text-lg font-semibold mb-2">Quantity: {swordBalance.toString()}</p>
              {getImageUrl(nftMetadata.Sword) && (
                <div className="mb-3">
                  <Image
                    src={getImageUrl(nftMetadata.Sword)}
                    alt="Sword NFT"
                    className="w-32 h-32 object-cover mx-auto rounded-lg border-2 border-base-300"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                    }}
                    width={128}
                    height={128}
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      {(!bowBalance || bowBalance === 0n) &&
        (!staffBalance || staffBalance === 0n) &&
        (!swordBalance || swordBalance === 0n) && (
          <div className="text-center mt-8">
            <p className="text-lg text-gray-500">
              Your inventory is empty. Visit the Store tab to purchase some weapons!
            </p>
          </div>
        )}
    </div>
  );

  // Render Game Player Tab Content
  const renderGamePlayerTab = () => (
    <div className="px-5">
      <h2 className="text-2xl font-bold text-center mb-6">🎮 Game</h2>
      <Unity unityProvider={unityProvider} style={{ width: 763, height: 463 }} />
    </div>
  );

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Privy Unity Experience</span>
            <span className="block text-md font-bold">Please give time for things to load.</span>
          </h1>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="tabs tabs-boxed">
              <button className={`tab ${activeTab === "buy" ? "tab-active" : ""}`} onClick={() => setActiveTab("buy")}>
                🛒 Store
              </button>
              <button
                className={`tab ${activeTab === "inventory" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("inventory")}
              >
                🎒 Inventory
              </button>
              <button
                className={`tab ${activeTab === "game" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("game")}
              >
                🎮 Game
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "buy" && renderBuyItemsTab()}
            {activeTab === "inventory" && renderInventoryTab()}
            {activeTab === "game" && renderGamePlayerTab()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
