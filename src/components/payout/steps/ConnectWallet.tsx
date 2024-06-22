/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ConnectWalletSVG } from '@/components/SVGs'
import { CHECKOUTSTEPS } from '@/lib/types'
import { motion } from 'framer-motion'
import Price from '@/components/ui/price'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ConnectWalletProps {
  handleStepChange: (step: CHECKOUTSTEPS) => void
  title: string
  pricing: number
  pricingDescription: React.ReactNode | string
}

const ConnectWallet = ({ handleStepChange, title, pricing, pricingDescription }: ConnectWalletProps) => {
  const account = useAccount()
  const { openConnectModal, connectModalOpen } = useConnectModal()

  const isConnected = account.status === 'connected'

  useEffect(() => {
    if (account.status === 'connected') {
      handleStepChange(CHECKOUTSTEPS['select-token'])
    }
  }, [account])

  return (
    <motion.div className="w-full">
      <div className="flex flex-1 items-center justify-center">
        <ConnectWalletSVG />
      </div>

      <div className="mt-6 space-y-1.5 text-center">
        <h4 className="text-2xl font-bricolage font-semibold">Connect Wallet</h4>
        <p className="font-geist text-[#474747]">You are about to make payment for:</p>
      </div>

      <div className="mt-8 space-y-8">
        <div
          className="p-4 border border-[#F0F0F0] rounded-[24px] bg-white"
          style={{ boxShadow: '0px 12px 20px 0px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="text-[#474747] font-medium font-geist border-b border-[#F0F0F0] pb-6">
            <p className="text-[13px]">{title}</p>

            <div className="mt-4 text-xs">
              <span className="text-[24px]">
                <Price price={pricing} />
              </span>
              {/* <span>/</span>{" "}
              <span>month</span> */}
            </div>
          </div>

          <div className="mt-4 whitespace-pre-line text-[13px] text-[#969696]">{pricingDescription}</div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            className="h-10 px-4 py-3 bg-[#F3F3F3] text-black inline-flex items-center justify-center text-[13px] rounded-[32px] hover:opacity-85 transition-all duration-300 ease-in-out font-medium"
            onClick={() => handleStepChange(CHECKOUTSTEPS.continue)}
          >
            Back
          </button>
          <Button
            className="h-10 px-4 py-3 bg-black text-white inline-flex items-center justify-center text-[13px] rounded-[32px] hover:opacity-85 transition-all duration-300 ease-in-out font-medium"
            disabled={connectModalOpen || (!isConnected && account.status !== 'disconnected')}
            loading={connectModalOpen || (!isConnected && account.status !== 'disconnected')}
            onClick={isConnected ? () => handleStepChange(CHECKOUTSTEPS['select-token']) : openConnectModal}
          >
            {isConnected ? 'Continue' : 'Connect wallet'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ConnectWallet
