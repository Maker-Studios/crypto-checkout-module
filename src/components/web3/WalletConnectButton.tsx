/* eslint-disable @next/next/no-img-element */
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { cn } from "@/lib/utils";
import Image from 'next/image';

export const WalletConnectButton = ({ canChange = true }: { canChange?: boolean }) => {
  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return null
                }
                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network, click to switch network
                    </button>
                  );
                }
                return (
                  <div className='flex space-x-2'>
                    <button
                      onClick={canChange ? openChainModal : undefined}
                      className='flex items-center rounded-[32px] border border-[#F1F1F1] space-x-2 p-2 bg-white'
                      type="button"
                    >
                      <span>
                        {chain.hasIcon ? (
                          chain.iconUrl && (
                            <Image
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              width={20}
                              height={20}
                            />
                          )
                        ) : chain.name}
                      </span>
                      {canChange && <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                          <mask id="mask0_1286_2752" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                            <rect x="0.5" y="0.554688" width="16" height="16" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_1286_2752)">
                            <path d="M8.5 10.8215L4.5 6.82152L5.43333 5.88818L8.5 8.95485L11.5667 5.88818L12.5 6.82152L8.5 10.8215Z" fill="#1C1B1F" />
                          </g>
                        </svg>
                      </span>}
                    </button>
                    <button onClick={openAccountModal} className='flex items-center rounded-[32px] border border-[#F1F1F1] space-x-2 p-2 bg-white' type="button">
                      <Image
                        alt={account.ensName ?? account.displayName}
                        src={account.ensAvatar ?? ''}
                        width={20}
                        height={20}
                        className='rounded-full'
                      />
                      <span className='text-[#474747] font-geist text-[16px] font-medium'>
                        {account.displayName}
                      </span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                          <mask id="mask0_1286_2752" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                            <rect x="0.5" y="0.554688" width="16" height="16" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_1286_2752)">
                            <path d="M8.5 10.8215L4.5 6.82152L5.43333 5.88818L8.5 8.95485L11.5667 5.88818L12.5 6.82152L8.5 10.8215Z" fill="#1C1B1F" />
                          </g>
                        </svg>
                      </span>
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
};