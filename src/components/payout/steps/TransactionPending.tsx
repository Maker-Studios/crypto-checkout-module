'use client'

import { CHECKOUTSTEPS } from '@/lib/types'
import { motion } from 'framer-motion'

import { PendingSVG } from '@/components/SVGs'
import { useEffect } from 'react'
import Link from 'next/link'
import { useClient, useTransactionConfirmations, useWatchBlocks } from 'wagmi'

interface TransactionPendingProps {
  txHash: `0x${string}`
  confirmations: number
  handleStepChange: (step: CHECKOUTSTEPS) => void
}

const TransactionPending = ({ txHash, confirmations, handleStepChange }: TransactionPendingProps) => {
  // TODO : Listen to this tx till the number of confirmations react
  const client = useClient()
  const { data, refetch } = useTransactionConfirmations({
    hash: txHash,
  })

  useWatchBlocks({
    onBlock() {
      refetch()
    },
  })

  if (data !== undefined && data >= confirmations) {
    handleStepChange(CHECKOUTSTEPS['transaction-result'])
  }

  return (
    <motion.div>
      <div className="flex items-center justify-center">
        <PendingSVG />
      </div>

      <div className="mt-4 space-y-1.5 text-center">
        <h4 className="text-2xl font-bricolage font-semibold">Transaction pending</h4>
        <p className="font-geist text-[#474747]">Please allow the transaction to complete.</p>

        <motion.div className="text-center font-geist text-[13px] text-[#969696]">
          <p className="space-x-1">
            <span>
              Checkout tx pending:{' '}
              {client?.chain.blockExplorers?.default.url ? (
                <Link
                  className="space-x-1 inline-flex items-center justify-center"
                  target="_blank"
                  href={`${client?.chain.blockExplorers?.default.url}/tx/${txHash}`}
                >
                  <span className="text-[#0094FF]">
                    {txHash.slice(0, 6)}...{txHash.slice(-5)}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-flex"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M11.1688 6.83083L5.43109 12.5686L4.48828 11.6258L10.226 5.88802H5.16883V4.55469H12.5021V11.888H11.1688V6.83083Z"
                      fill="#0094FF"
                    />
                  </svg>
                </Link>
              ) : (
                <span className="text-[#0094FF]">
                  {txHash.slice(0, 6)}...{txHash.slice(-5)}
                </span>
              )}
            </span>
            <span>
              ({data?.toString() || 0}/{confirmations})
            </span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default TransactionPending
