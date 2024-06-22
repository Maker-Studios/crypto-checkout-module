'use client'

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, WagmiProvider } from 'wagmi'
import { mainnet, hardhat, optimism, arbitrum } from 'wagmi/chains'

const config = getDefaultConfig({
  appName: '3dayMVP Token Payment',
  projectId: process.env.NEXT_PUBLIC_WC ?? '',
  chains: [mainnet, optimism, arbitrum],
  ssr: true,
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET ?? undefined),
    [optimism.id]: http(process.env.NEXT_PUBLIC_OP ?? undefined),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARB ?? undefined),
    [hardhat.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider showRecentTransactions={true}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
